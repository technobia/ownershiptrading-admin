import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Button, Card, Col, FormGroup, Row, InputGroup,  } from "react-bootstrap";
import cs from "classnames";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import styles from "./TagForm.module.scss";
import InputNumber from "src/components/Form/InputNumber";

const Item = (props) => {
  const form = useFormContext();
  const data = get(form.watch("tags"), props.index, {});

  const score = Math.trunc((parseInt(data.score) / (props.totalScore * 1.0)) * 100) || 0;

  return (
    <Card className="my-3">
      <Card.Body>
        <Row>
          <Col>
            <FormGroup>
              <label>Name</label>
              <input className="form-control" ref={form.register} name={`tags[${props.index}].name`} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Score</label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>{score}%</InputGroup.Text>
                </InputGroup.Prepend>
                <Controller
                  as={InputNumber}
                  control={form.control}
                  className="form-control"
                  name={`tags[${props.index}].score`}
                  placeholder="0"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <label>Script</label>
          <textarea
            rows="3"
            className={cs("form-control", styles.textarea)}
            ref={form.register}
            name={`tags[${props.index}].tag`}
            placeholder="Enter a script tag"
          />
        </FormGroup>
        <div className="text-right"><Button variant="danger" onClick={() => props.onClickRemove(props.index)}>Remove</Button></div>
      </Card.Body>
    </Card>
  )
};

const Multipule = (props) => {
  const form = useFormContext();
  const tags = form.watch("tags") || [];
  const isMultipule = form.watch("isMultipule");
  const [items, setItems] = useState(tags);

  useEffect(() => {
    if (!isEmpty(props.detail)) {
      const _tags = get(props.detail, "tags");
      setItems(_tags)
    }
    // eslint-disable-next-line
  }, [props.detail]);

  useEffect(() => {
    form.setValue("tags", items);
    // eslint-disable-next-line
  }, [items]);

  const onClickAddItem = () => setItems([
    ...tags,
    { name: "", tag: "", score: "" }
  ]);

  const onClickRemove = (index) => {
    const _items = cloneDeep(tags);
    _items.splice(index, 1);
    setItems(_items);
  };

  const totalScore = tags.reduce((result, item) => parseInt(item.score, 10) ? result += parseInt(item.score, 10) : result, 0);

  return (
    <>
      <label className="switcher">
        <input
          ref={form.register}
          name="isMultipule"
          type="checkbox"
          className="switcher-input"
        />
        <span className="switcher-indicator">
            <span className="switcher-yes"/>
            <span className="switcher-no"/>
          </span>
        <span className="switcher-label">Multipule</span>
      </label>

      {isMultipule && (
        <>
          {items.map((item, index) => (
            <Item key={index} index={index} totalScore={totalScore} onClickRemove={onClickRemove} />
          ))}
          <div className="mt-3">
            <Button variant="primary icon-btn" onClick={onClickAddItem}><span className="ion ion-md-add"/></Button>
          </div>
        </>
      )}
    </>
  )
};

export default Multipule;
