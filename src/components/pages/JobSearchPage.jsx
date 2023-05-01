import {
  Button,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import BodyLayout from "../layouts/BodyLayout";
import { getAllCircularsApi } from "../../api/circular/circularApi";
import { useAuthContext } from "../../contexts/AuthContext";
import { handlePublicApiError } from "../../api/errorHandlers";
import { showErrorToastAction, showToastAction } from "../../utils/toast";
import { FlexContainer, Gap } from "../common/spaces";
import { getAllFieldsApi } from "../../api/fields/fieldApi";

const Container = styled.div`
  width: 100%;
`;

const JobsGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

const JobSearchPage = () => {
  const pageSize = 15;
  // const router = useRouter();

  const { authApplicant } = useAuthContext();

  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(undefined);

  const [search, setSearch] = useState("");
  const [circulars, setCirculars] = useState([]);
  const [applyLoadingId, setApplyLoadingId] = useState(undefined);
  const [count, setCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const getAllCircularsApiAction = useDebouncedCallback(
    useCallback(async () => {
      try {
        const { data } = await getAllCircularsApi(
          search,
          pageNo,
          pageSize,
          selectedField
        );
        setCirculars(data.circulars);
        setCount(data.count);
      } catch (err) {
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({ message: data?.message || error });
      }
    }, [search, selectedField, pageNo]),
    600
  );

  useEffect(() => {
    getAllCircularsApiAction();
  }, [getAllCircularsApiAction]);

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

  const handleSearchChange = (val) => {
    setSearch(val);
    getAllCircularsApiAction();
  };

  const handleFieldChange = (val) => {
    setSelectedField(val);
    getAllCircularsApiAction();
  };

  const onClearField = () => {
    setSelectedField(undefined);
    getAllCircularsApiAction();
  };

  const onApplyClick = async (circularId) => {
    if (!authApplicant) return;
    setApplyLoadingId(circularId);
    try {
      await applyToCircularApi(circularId);
      showToastAction({ message: "Applied", type: "success" });
      setApplyLoadingId(undefined);
      getAllCircularsApiAction();
    } catch (err) {
      setApplyLoadingId(undefined);
      // const { data, error } = handlePrivateApiError(err, () =>
      //   logoutApplicantApiAction(() => router.push("/applicant/login"))
      // );
      showErrorToastAction({
        message: data?.message || error || "Failed to apply",
      });
    }
  };

  return (
    <BodyLayout>
      <Container>
        <Input.Search
          addonBefore={
            <Select
              style={{ width: 300 }}
              allowClear
              placeholder="Select Categories"
              size="large"
              options={fields.map((f) => ({ label: f.title, value: f.id }))}
              value={selectedField}
              onSelect={handleFieldChange}
              onClear={onClearField}
            />
          }
          placeholder="Search for jobs"
          allowClear
          enterButton="Search"
          size="large"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        {circulars.length ? (
          <>
            <JobsGrid>
              {circulars.map((circular) => (
                <JobCard
                  key={circular.id}
                  circular={circular}
                  showApply={!!authApplicant}
                  onApply={() => onApplyClick(circular.id)}
                  applyLoading={applyLoadingId === circular.id}
                />
              ))}
            </JobsGrid>

            <FlexContainer justifyContent="center">
              <Pagination
                total={count}
                pageSize={pageSize}
                onChange={(page) => setPageNo(page)}
              />
            </FlexContainer>
          </>
        ) : (
          <FlexContainer flexDirection="column" justifyContent="center">
            <Gap height="2rem" />
            <Typography.Title style={{ textAlign: "center" }} level={3}>
              No circulars found
            </Typography.Title>
          </FlexContainer>
        )}
      </Container>
    </BodyLayout>
  );
};

export default JobSearchPage;
