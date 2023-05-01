import { Button, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AdminDashboardLayout from "../../../layouts/AdminDashboardLayout";
import {
  getAllCompanies,
  verifyCompanyApi,
} from "../../../../api/company/companyApi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { SERVER_URL } from "../../../../config";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { handlePrivateApiError } from "../../../../api/errorHandlers";
import { showErrorToastAction } from "../../../../utils/toast";

const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const AllCompanies = () => {
  const { logoutAdminApiAction } = useAuthContext();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [count, setCount] = useState(0);

  const [verifyLoading, setVerifyLoading] = useState([]);

  const getAllCompaniesApiAction = useCallback(
    async (isLoad = true) => {
      try {
        if (isLoad) {
          setLoading(true);
        }

        const { data } = await getAllCompanies(pageNo, 10);
        setCompanies(data.companies);
        setCount(data.count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const { data, error } = handlePrivateApiError(
          err,
          logoutAdminApiAction
        );
        showErrorToastAction({
          message: data?.message || error || "Something went wrong",
        });
      }
    },
    [pageNo, logoutAdminApiAction]
  );

  useEffect(() => {
    getAllCompaniesApiAction();
  }, [getAllCompaniesApiAction]);

  const onClickCompanyVerify = useCallback(
    async (companyId) => {
      try {
        setVerifyLoading((prev) => [...prev, companyId]);

        await verifyCompanyApi(companyId);

        setVerifyLoading((prev) => prev.filter((id) => id !== companyId));
        getAllCompaniesApiAction(false);
      } catch (err) {
        setVerifyLoading((prev) => prev.filter((id) => id !== companyId));
        const { data, error } = handlePrivateApiError(
          err,
          logoutAdminApiAction
        );
        showErrorToastAction({
          message: data?.message || error || "Something went wrong",
        });
      } finally {
      }
    },
    [logoutAdminApiAction]
  );

  const columns = [
    {
      title: "",
      dataIndex: "logo",
      key: "logo",
      render: (logo, record) => (
        <CompanyLogo src={`${SERVER_URL}${logo}`} alt={record.title} />
      ),
    },
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
        parseInt(verified) ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            loading={verifyLoading.includes(record.id)}
            onClick={() => onClickCompanyVerify(record.id)}
          >
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
        rowKey={(record) => record.id}
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
