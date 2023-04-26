import { Alert, Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";
import {
  getAllCompanies,
  verifyCompanyApi,
} from "../../../../api/company/companyApi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);

  const getAllCompaniesApiAction = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getAllCompanies(pageNo, 10);
      setCompanies(data.companies);
      setCount(data.count);
    } catch (err) {
      Alert({ message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }, [pageNo]);

  useEffect(() => {
    getAllCompaniesApiAction();
  }, [getAllCompaniesApiAction]);

  const onClickCompanyVerify = useCallback(async (companyId) => {
    try {
      await verifyCompanyApi(companyId);
    } catch (err) {
      //
    } finally {
      getAllCompaniesApiAction();
    }
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (title) => <a>{title}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (verified) =>
        verified ? <CheckCircleOutlined /> : <CloseCircleOutlined />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => onClickCompanyVerify(record.id)}>
            Verify
          </Button>
        </>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <Table
        columns={columns}
        dataSource={companies}
        loading={loading}
        pagination={{
          total: count,
          pageSize: 10,
          onChange: (page) => setPageNo(page),
        }}
      />
    </AdminDashboardLayout>
  );
};

export default AllCompanies;
