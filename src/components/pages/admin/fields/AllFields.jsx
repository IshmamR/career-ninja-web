import { Alert, Button, Input, Modal, Table } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import {
  addFieldApi,
  deleteFieldApi,
  getAllFieldsApi,
} from "../../../../api/fields/fieldApi";
import { handlePrivateApiError } from "../../../../api/errorHandlers";
import { useAuthContext } from "../../../../contexts/AuthContext";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";

const AllFields = () => {
  const { logoutAdminApiAction } = useAuthContext();

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);

  const [addModal, setAddModal] = useState({
    title: "",
    open: false,
    loading: false,
  });
  const [deleteLoading, setDeleteLoading] = useState(undefined);

  const getAllFieldsApiAction = useCallback(
    async (isLoad = true) => {
      try {
        if (isLoad) {
          setLoading(true);
        }
        const { data } = await getAllFieldsApi({ page: pageNo, limit: 10 });
        setFields(data.fields);
        setCount(data.count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const { data, error } = handlePrivateApiError(
          err,
          logoutAdminApiAction
        );
        Alert({ message: data?.message || error || "Something went wrong" });
      }
    },
    [pageNo]
  );

  useEffect(() => {
    getAllFieldsApiAction();
  }, [getAllFieldsApiAction]);

  const onClickAddField = () => {
    setAddModal((prev) => ({ ...prev, open: true }));
  };

  const closeAddModal = () => {
    setAddModal({ title: "", open: false, loading: false });
  };

  const onAddField = async () => {
    if (!addModal.title) {
      return;
    }

    try {
      setAddModal((prev) => ({ ...prev, loading: true }));
      await addFieldApi({ title: addModal.title });
      getAllFieldsApiAction(false);
      closeAddModal();
    } catch (err) {
      setAddModal((prev) => ({ ...prev, loading: false }));
      const { data, error } = handlePrivateApiError(err, logoutAdminApiAction);
      Alert({ message: data?.message || error || "Something went wrong" });
    }
  };

  const onClickDeleteField = async (id) => {
    try {
      setDeleteLoading(id);
      await deleteFieldApi(id);
      getAllFieldsApiAction(false);
      setDeleteLoading(undefined);
    } catch (err) {
      setDeleteLoading(undefined);
      const { data, error } = handlePrivateApiError(err, logoutAdminApiAction);
      Alert({ message: data?.message || error || "Something went wrong" });
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            danger
            loading={record.id === deleteLoading}
            onClick={() => onClickDeleteField(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <Button type="primary" onClick={onClickAddField}>
        Add field
      </Button>

      <Table
        columns={columns}
        dataSource={fields}
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
        title="Add a field"
        okText="Add"
        onOk={onAddField}
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
          onPressEnter={onAddField}
          placeholder="title"
        />
      </Modal>
    </AdminDashboardLayout>
  );
};

export default AllFields;
