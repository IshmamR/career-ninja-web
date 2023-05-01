import { Button, Input, Modal, Select, Table } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { getAllFieldsApi } from "../../../../api/fields/fieldApi";
import {
  handlePrivateApiError,
  handlePublicApiError,
} from "../../../../api/errorHandlers";
import { useAuthContext } from "../../../../contexts/AuthContext";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";
import {
  addSkillApi,
  deleteSkillApi,
  getAllSkillsApi,
} from "../../../../api/skills/skillApi";
import { showErrorToastAction } from "../../../../utils/toast";

const AllSkills = () => {
  const { logoutAdminApiAction } = useAuthContext();

  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);

  const [addModal, setAddModal] = useState({
    title: "",
    fieldId: undefined,
    open: false,
    loading: false,
  });
  const [deleteLoading, setDeleteLoading] = useState(undefined);

  const getAllFieldsApiAction = useCallback(async () => {
    try {
      const { data } = await getAllFieldsApi({ page: 1, limit: 100 });
      setFields(data.fields);
    } catch (err) {
      const { data, error } = handlePublicApiError(err);
      showErrorToastAction({
        message: data?.message || error || "Something went wrong",
      });
    }
  }, []);

  useEffect(() => {
    getAllFieldsApiAction();
  }, [getAllFieldsApiAction]);

  const getAllSkillsApiAction = useCallback(
    async (isLoad = true) => {
      try {
        if (isLoad) {
          setLoading(true);
        }
        const { data } = await getAllSkillsApi({ page: pageNo, limit: 10 });
        setSkills(data.skills);
        setCount(data.count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({
          message: data?.message || error || "Something went wrong",
        });
      }
    },
    [pageNo]
  );

  useEffect(() => {
    getAllSkillsApiAction();
  }, [getAllSkillsApiAction]);

  const onClickAddSkill = () => {
    setAddModal((prev) => ({ ...prev, open: true }));
  };

  const closeAddModal = () => {
    setAddModal({ title: "", fieldId: undefined, open: false, loading: false });
  };

  const onAddSkill = async () => {
    if (!addModal.title || !addModal.fieldId) {
      return;
    }

    try {
      setAddModal((prev) => ({ ...prev, loading: true }));
      await addSkillApi({ title: addModal.title, fieldId: addModal.fieldId });
      getAllSkillsApiAction(false);
      closeAddModal();
    } catch (err) {
      setAddModal((prev) => ({ ...prev, loading: false }));
      const { data, error } = handlePrivateApiError(err, logoutAdminApiAction);
      showErrorToastAction({
        message: data?.message || error || "Something went wrong",
      });
    }
  };

  const onClickDeleteSkill = async (id) => {
    try {
      setDeleteLoading(id);
      await deleteSkillApi(id);
      getAllSkillsApiAction(false);
      setDeleteLoading(undefined);
    } catch (err) {
      setDeleteLoading(undefined);
      const { data, error } = handlePrivateApiError(err, logoutAdminApiAction);
      showErrorToastAction({
        message: data?.message || error || "Something went wrong",
      });
    }
  };

  const columns = [
    {
      title: "Serial no.",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => <p>{index + 1}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <a>{title}</a>,
    },
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      render: (field) => <p>{field}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            danger
            loading={record.id === deleteLoading}
            onClick={() => onClickDeleteSkill(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <Button type="primary" onClick={onClickAddSkill}>
        Add skill
      </Button>

      <Table
        columns={columns}
        dataSource={skills}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={{
          total: count,
          pageSize: 10,
          onChange: (page) => setPageNo(page),
        }}
      />

      <Modal
        open={addModal.open}
        title="Add a skill"
        okText="Add"
        onOk={onAddSkill}
        onCancel={closeAddModal}
        confirmLoading={addModal.loading}
      >
        <Input
          autoFocus
          name="title"
          value={addModal.title}
          onChange={(e) =>
            setAddModal((prev) => ({ ...prev, title: e.target.value }))
          }
          onPressEnter={onAddSkill}
          placeholder="title"
        />
        <Select
          placeholder="field"
          style={{ width: "100%", marginTop: "1rem" }}
          value={addModal.fieldId}
          options={fields.map((f) => ({ label: f.title, value: f.id }))}
          onChange={(v) => setAddModal((prev) => ({ ...prev, fieldId: v }))}
        />
      </Modal>
    </AdminDashboardLayout>
  );
};

export default AllSkills;
