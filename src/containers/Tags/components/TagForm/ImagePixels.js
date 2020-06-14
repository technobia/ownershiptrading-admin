import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import cloneDeep from "lodash/cloneDeep";
import { Button, Card, Col, FormGroup, Row } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

const Item = (props) => {
  const form = useFormContext();

  return (
    <Card className="my-3">
      <Card.Body>
        <Row>
          <Col>
            <FormGroup>
              <label>Name</label>
              <input className="form-control" ref={form.register} name={`imagePixels[${props.index}].name`} />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <label>URL</label>
              <input className="form-control" ref={form.register} name={`imagePixels[${props.index}].url`} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <label>Order</label>
              <input className="form-control" ref={form.register} name={`imagePixels[${props.index}].order`} />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <label>Cap (Daily)</label>
              <input className="form-control" ref={form.register} name={`imagePixels[${props.index}].cap`} />
            </FormGroup>
          </Col>
        </Row>
        <div className="text-right"><Button variant="danger" onClick={() => props.onClickRemove(props.index)}>Remove</Button></div>
      </Card.Body>
    </Card>
  )
};

const ImagePixels = (props) => {
  const form = useFormContext();
  const imagePixels = form.watch("imagePixels") || [];
  const isImagePixels = form.watch("isImagePixels");
  const [items, setItems] = useState(imagePixels);

  useEffect(() => {
    if (!isEmpty(props.detail)) {
      const _imagePixels = get(props.detail, "imagePixels");
      setItems(_imagePixels)
    }
    // eslint-disable-next-line
  }, [props.detail]);

  useEffect(() => {
    form.setValue("imagePixels", items);
    // eslint-disable-next-line
  }, [items]);

  const onClickAddItem = () => setItems([
    ...imagePixels,
    { name: "", url: "", order: "", cap: "" }
  ]);

  const onClickRemove = (index) => {
    const _items = cloneDeep(imagePixels);
    _items.splice(index, 1);
    setItems(_items);
  };

  return (
    <>
      <label className="switcher">
        <input
          ref={form.register}
          name="isImagePixels"
          type="checkbox"
          className="switcher-input"
        />
        <span className="switcher-indicator">
            <span className="switcher-yes"/>
            <span className="switcher-no"/>
          </span>
        <span className="switcher-label">Image Pixels</span>
      </label>

      {isImagePixels && (
        <>
          {items.map((item, index) => (
            <Item key={index} index={index} onClickRemove={onClickRemove} />
          ))}
          <div className="mt-3">
            <Button variant="primary icon-btn" onClick={onClickAddItem}><span className="ion ion-md-add"/></Button>
          </div>
        </>
      )}
    </>
  );
};

export default ImagePixels;
