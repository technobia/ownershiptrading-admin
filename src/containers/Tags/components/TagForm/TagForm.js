import React, { useEffect, useState } from "react";
import { Card, Form, FormGroup } from "react-bootstrap";
import { Controller, FormContext, useForm, ErrorMessage } from "react-hook-form";
import cs from "classnames";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import Button from "src/components/Form/Button";
import SingleSelect from "src/components/Form/SingleSelect";
import styles from "./TagForm.module.scss";
import Multipule from "./Multipule";
import ImagePixels from "./ImagePixels";
import { connect } from "react-redux";
import { getImageURL, getImageName } from "src/utils/tag";

const MEDIA_OPTIONS = [
  { label: "In app- Mopub", value: "In app- Mopub" },
  { label: "In app", value: "In app" },
  { label: "Mobile web", value: "Mobile web" },
];

const Image = ({ src }) => {
  const image = getImageURL(src);
  return (
    <div className={cs("mt-3", styles.image)}><img src={image} alt={src} /></div>
  );
};

const TagForm = (props) => {
  const [bannerOptions, setBannerOptions] = useState([]);
  const form = useForm({
    defaultValues: {
      adv_id: "",
      adv_tag: "",
      kosher_banner: "",
      kosher_url: "",
      traffic_type: "",
      AM: "",
      isMultipule: false,
      isImagePixels: false,
    },
  });

  useEffect(() => {
    if (!isEmpty(props.detail)) {
      form.reset(decorateTagDetail(props.detail));
    }
    // eslint-disable-next-line
  }, [props.detail]);

  useEffect(() => {
    if (!isEmpty(props.creatives)) {
      const options = props.creatives.map(item => ({ value: item.name, label: item.name }));
      setBannerOptions(options);
    }
    // eslint-disable-next-line
  }, [props.creatives]);

  const onSubmit = (data) => props.onSubmit(decorateSubmit(data));

  const bannerImageWatch = form.watch("kosher_banner");

  return (
    <FormContext {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <Card.Body>
            <FormGroup>
              <label>Advertiser Name</label>
              <Controller
                as={Form.Control}
                control={form.control}
                name="adv_id"
              />
            </FormGroup>

            <FormGroup>
              <label>Banner Image <span className="text-danger">*</span></label>
              <Controller
                as={SingleSelect}
                rules={{ required: "This field is required" }}
                control={form.control}
                options={bannerOptions}
                loading={props.creativesLoading}
                name="kosher_banner"
              />
              <ErrorMessage errors={form.errors} name="kosher_banner">
                {({ message }) => <span className="text-danger mt-2 small">{message}</span>}
              </ErrorMessage>
              {bannerImageWatch && (
                <div>
                  <Image src={bannerImageWatch.value} />
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <label>Banner Link</label>
              <Controller
                as={Form.Control}
                control={form.control}
                name="kosher_url"
              />
            </FormGroup>

            <FormGroup>
              <label>Media</label>
              <Controller
                as={SingleSelect}
                control={form.control}
                options={MEDIA_OPTIONS}
                name="traffic_type"
              />
            </FormGroup>

            <FormGroup>
              <label>Account manager</label>
              <Controller
                as={Form.Control}
                control={form.control}
                name="AM"
              />
            </FormGroup>

            <FormGroup>
              <label>Script <span className="text-danger">*</span></label>
              <Controller
                as={<Form.Control as="textarea" rows={6} className={styles.textarea} />}
                rules={{ required: "This field is required" }}
                placeholder="Enter a script tag"
                control={form.control}
                name="adv_tag"
              />
              <ErrorMessage errors={form.errors} name="adv_tag">
                {({ message }) => <span className="text-danger mt-2 small">{message}</span>}
              </ErrorMessage>
            </FormGroup>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Body>
            <Multipule detail={props.detail} />
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Body>
            <ImagePixels detail={props.detail} />
          </Card.Body>
        </Card>

        <Button
          color="primary"
          type="submit"
          className="mt-3"
          loading={props.saving}
          disabled={props.isEdit}
        >
          Save
        </Button>
      </Form>
    </FormContext>
  );
};

function decorateSubmit(data) {
  const kosher_banner = get(data, "kosher_banner.value", "");
  return {
    ...data,
    kosher_banner: kosher_banner ? getImageURL(kosher_banner) : kosher_banner,
    traffic_type: get(data, "traffic_type.value", ""),
  }
}

function decorateTagDetail(data) {
  const kosher_banner = get(data, "kosher_banner", "");
  return {
    ...data,
    kosher_banner: kosher_banner
      ? { value: getImageName(kosher_banner), label: getImageName(kosher_banner) }
      : kosher_banner
  };
}

TagForm.defaultProps = {
  isEdit: false,
  detail: {}
};

export default connect(
  state => ({
    creativesLoading: state.creatives.loading,
    creatives: state.creatives.collections,
    saving: state.tags.saving
  })
)(TagForm);
