import React, { useEffect, useState } from "react";
import { Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import { connect } from "react-redux";
import get from "lodash/get";
import {
  getAccountManagerOptions,
  getAccountManagers,
  getExitsTags,
  getPlacementOptions,
} from "src/utils/tag";
import SingleSelect from "src/components/Form/SingleSelect";
import Button from "src/components/Form/Button";
import MultiSelect from "src/components/Form/MultiSelect";
import DateRangePicker from "src/components/Form/DateRangePicker";
import { getSearchObject } from "src/utils/location";
import { useLocation } from "react-router-dom";
import Loader from "src/shared/Loader";
import moment from "moment";

const DIMENTION_OPTIONS = [
  { value: "day", label: "Date" },
  { value: "plcmntid", label: "Placment Id" },
  { value: "advertiser", label: "Placment Name" },
  { value: "hour", label: "Hour" },
  { value: "plid", label: "Plid" },
  { value: "affid", label: "Affid" },
  { value: "country", label: "Country" },
];

const DATE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7days", label: "Last 7 Days" },
  { value: "thismonth", label: "This Month" },
  { value: "lastmonth", label: "Last Month" },
  { value: "custom", label: "Custom" },
];

const FilterSection = (props) => {
  const location = useLocation();
  const searchParams = getSearchObject(location.search);
  const [accountManager, setAccountManager] = useState({});
  const { control, handleSubmit, watch, setValue, errors } = useForm();

  useEffect(() => {
    if (props.tags.length) {
      const AM = getAccountManagers(props.tags);
      setAccountManager(AM);

      /* update multi tag select when receive tag params search */
      const tags = searchParams.tag ? searchParams.tag.split(",") : [];
      const exitsTag = getExitsTags(tags, getPlacementOptions(props.tags));
      setValue("placements", exitsTag);
    }
    // eslint-disable-next-line
  }, [props.tags]);

  const onSubmit = (data) => props.onSubmit(decorateFormData(data));

  const valueAM = (watch("AM") || {}).value;
  const valueDate = (watch("date") || {}).value;

  return props.getTagLoading ? (
    <Loader />
  ) : (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={8}>
              <FormGroup>
                <label>Tags</label>
                <Controller
                  as={MultiSelect}
                  options={getPlacementOptions(props.tags)}
                  loading={props.getTagLoading}
                  control={control}
                  name="tags"
                  defaultValue={[]}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <label>Account Managers</label>
                <Controller
                  as={SingleSelect}
                  loading={props.getTagLoading}
                  options={getAccountManagerOptions(props.tags)}
                  name="AM"
                  control={control}
                  defaultValue=""
                />
                {valueAM && (
                  <div className="small mt-1">{`${accountManager[valueAM]} Placements for Account Managers`}</div>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <FormGroup>
                <label>Fields</label>
                <Controller
                  as={MultiSelect}
                  control={control}
                  name="fields"
                  options={DIMENTION_OPTIONS}
                  defaultValue={[]}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <label>Dates <span className="text-danger">*</span></label>
                <Controller
                  as={SingleSelect}
                  rules={{ required: "This field is required" }}
                  control={control}
                  name="date"
                  options={DATE_OPTIONS}
                  defaultValue=""
                />
                <ErrorMessage errors={errors} name="date">
                  {({ message }) => <span className="text-danger mt-2 small">{message}</span>}
                </ErrorMessage>
              </FormGroup>
            </Col>
            {valueDate === "custom" && (
              <Col md={4}>
                <FormGroup>
                  <label>&nbsp;</label>
                  <Controller
                    as={DateRangePicker}
                    control={control}
                    name="date_value"
                    defaultValue={{}}
                  />
                </FormGroup>
              </Col>
            )}
          </Row>

          <Row>
            <Col md={12} className="text-right">
              <Button color="primary" type="submit" loading={props.loading} disabled={props.loading}>Search</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

function decorateFormData(formData) {
  let start, end;
  const dateValue = get(formData, "date.value");
  switch (dateValue) {
    case "today":
      start = end = moment().format("YYYY-MM-DD");
      break;

    case "yesterday":
      start = moment().subtract(1, 'd').format("YYYY-MM-DD");
      end = moment().format("YYYY-MM-DD");
      break;

    case "last7days":
      start = moment().subtract(7, 'd').format("YYYY-MM-DD");
      end = moment().format("YYYY-MM-DD");
      break;

    case "thismonth":
      start = moment().startOf('month').format("YYYY-MM-DD");
      end = moment().format("YYYY-MM-DD");
      break;

    case "lastmonth":
      start = moment().subtract(1,'months').startOf('month').format("YYYY-MM-DD");
      end = moment().subtract(1,'months').endOf('month').format("YYYY-MM-DD");
      break;

    case "custom":
      start = get(formData, "dateValue.start") || moment().format("YYYY-MM-DD");
      end = get(formData, "dateValue.end") || moment().format("YYYY-MM-DD");
      break;

    default: break;
  }

  const tags = get(formData, "tags", []).map(item => item.value);

  const AM = get(formData, "AM.value", "");

  const fields = get(formData, "fields", []).map(item => item.value).join(",");

  return {
    start,
    end,
    tags,
    AM,
    fields
  };
}

export default connect(state => ({
  getTagLoading: state.tags.getting,
  tags: state.tags.collections
}))(FilterSection);
