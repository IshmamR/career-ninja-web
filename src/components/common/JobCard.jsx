import { DollarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Tag, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 1rem;
  padding-top: 0;
`;

const ButtonsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const DescriptionDiv = styled.div``;

// interface IProps {
//   circular: IGetCircular;
//   showApply: boolean;
//   onApply: () => void;
//   applyLoading: boolean;
// }

const JobCard = ({ circular, showApply, onApply, applyLoading }) => {
  return (
    <CardContainer>
      <Typography.Title level={4} style={{ marginBottom: 0 }}>
        {circular.title}
      </Typography.Title>
      <Typography.Text>
        <strong>Company name:</strong> {circular.companyName}
      </Typography.Text>
      <br />
      <Typography.Text>
        <strong>Field:</strong> {circular.fieldTitle}
      </Typography.Text>
      <br />
      <Typography.Text>
        <strong>Role:</strong> {circular.role}
      </Typography.Text>
      <br />
      <Typography.Text>
        <strong>Vacancy:</strong> {circular.vacancy}
      </Typography.Text>
      <br />
      <strong>Salary range: </strong>
      <Tag icon={<DollarOutlined />} color="green">
        {circular.salaryRange}
      </Tag>
      <br />
      <br />
      <DescriptionDiv
        dangerouslySetInnerHTML={{
          __html: circular ? circular.description.slice(0, 350) + "..." : "",
        }}
      />

      {circular.isApplied ? (
        <Tag icon={<ExclamationCircleOutlined />} color="cyan">
          applied
        </Tag>
      ) : showApply ? (
        <ButtonsContainer>
          <Button type="primary" loading={applyLoading} onClick={onApply}>
            Apply
          </Button>
        </ButtonsContainer>
      ) : null}
    </CardContainer>
  );
};

export default JobCard;
