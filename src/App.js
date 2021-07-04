import { Button, Col, Form, Row, Select, Input } from "antd";
import React, { useState } from "react";
import "./App.css";
import { data } from "./DataFake/data";
import { district } from "./DataFake/quan_huyen";
import { province } from "./DataFake/tinh_tp";
const { Option } = Select;

const App = (props) => {
  const [dataSource, setDataSource] = useState(data);
  const dataProvince = [];
  const dataDistrict = [];
  const FORMAT_PRICE = 1000000;
  const dataPrice = [
    {
      name: "Dưới 1 triệu",
      code: { start: 0, end: 1 },
    },
    {
      name: "1 triệu đến 2 triệu",
      code: { start: 1, end: 2 },
    },
    {
      name: "2 triệu đến 3 triệu",
      code: { start: 2, end: 3 },
    },
    {
      name: "3 triệu đến 5 triệu",
      code: { start: 3, end: 5 },
    },
    {
      name: "5 triệu đến 7 triệu",
      code: { start: 5, end: 7 },
    },
    {
      name: "7 triệu đến 10 triệu",
      code: { start: 7, end: 10 },
    },
  ];
  const dataAcreage = [
    {
      name: "Dưới 20m2",
      code: { start: 0, end: 20 },
    },
    {
      name: "20m2 đến 30m2",
      code: { start: 20, end: 30 },
    },
    {
      name: "30m2 đến 50m2",
      code: { start: 30, end: 50 },
    },
    {
      name: "50 - 60m2",
      code: { start: 50, end: 60 },
    },
    {
      name: "60 - 70m2",
      code: { start: 60, end: 70 },
    },
    {
      name: "70 - 80m2",
      code: { start: 70, end: 80 },
    },
  ];

  const { getFieldDecorator } = props.form;

  const handleFilter = () => {
    let filterData = [];
    // eslint-disable-next-line array-callback-return
    filterData = data.filter((item) => {
      if (
        props.form.getFieldValue("province") &&
        props.form.getFieldValue("district")
      ) {
        return (
          item.city.includes(props.form.getFieldValue("province")) &&
          item.district.includes(props.form.getFieldValue("district"))
        );
      } else if (
        props.form.getFieldValue("province") ||
        props.form.getFieldValue("district")
      ) {
        return (
          item.city.includes(props.form.getFieldValue("province")) ||
          item.district.includes(props.form.getFieldValue("district"))
        );
      }
    });
    setDataSource(filterData);
  };

  const filterData = (value) => {
    if (value) {
      const dataSource = data.filter((item) => {
        return (
          item.city.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.district.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
      setDataSource(dataSource);
    } else {
      setDataSource(data);
    }
  };

  for (const provinced in province) {
    dataProvince.push(province[provinced]);
  }

  for (const districts in district) {
    dataDistrict.push(district[districts]);
  }

  const dataDistrictNew = dataDistrict.filter(
    (item) => item.parent_code === props.form.getFieldValue("province")
  );

  const renderNameDistrict = (district) => {
    return dataDistrict.find((e) => e.code === district)?.name_with_type;
  };

  const renderNameProvince = (province) => {
    return dataProvince.find((e) => e.code === province)?.name;
  };

  return (
    <>
      <div className="container-header">
        <Row gutter={24} className="wp-form">
          <Col span={24}>
            <Form layout="inline">
              <Row gutter={24}>
                <Col span={3}>
                  <Form.Item label={"Tỉnh thành"} colon={false}>
                    {getFieldDecorator("province", {
                      rules: [],
                    })(
                      <Select
                        style={{ width: 180 }}
                        showSearch={true}
                        allowClear={false}
                        placeholder="Chọn tỉnh thành"
                        notFoundContent={"No data"}
                      >
                        {dataProvince.map((item) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item label={"Quận huyện"} colon={false}>
                    {getFieldDecorator("district", {
                      rules: [],
                    })(
                      <Select
                        disabled={!props.form.getFieldValue("province")}
                        style={{ width: 180 }}
                        showSearch={true}
                        allowClear={false}
                        placeholder="Chọn quận huyện"
                        notFoundContent={"No data"}
                      >
                        {dataDistrictNew.map((item) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item label={"Khoảng giá"} colon={false}>
                    {getFieldDecorator("price", {
                      rules: [],
                    })(
                      <Select
                        style={{ width: 180 }}
                        showSearch={true}
                        allowClear={false}
                        placeholder="Chọn mức giá"
                        notFoundContent={"No data"}
                      >
                        {dataPrice.map((item) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item label={"Diện tích"} colon={false}>
                    {getFieldDecorator("acreage", {
                      rules: [],
                    })(
                      <Select
                        style={{ width: 180 }}
                        showSearch={true}
                        allowClear={false}
                        placeholder="Chọn diện tích"
                        notFoundContent={"No data"}
                      >
                        {dataAcreage.map((item) => (
                          <Select.Option value={item.code} key={item.code}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item>
                    <Button
                      // type="primary"
                      // htmlType="submit"
                      onClick={handleFilter}
                      className="customBtn"
                    >
                      Lọc tin
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item>
                    <Input
                      style={{ width: 300 }}
                      onChange={(e) => {
                        console.log("e", e.target.value);
                        filterData(e.target.value);
                      }}
                      placeholder="Nhập từ khóa"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="container-body">
        {dataSource.map((item) => (
          <div className="wp-border">
            <Row gutter={24}>
              <Col span={3}>
                <img className="image" alt="error image" src={item.thumbnail} />
              </Col>
              <Col span={21}>
                <div className="title">{item.title}</div>
                <div className="price">{`${
                  item.price / FORMAT_PRICE
                } triệu/tháng`}</div>
                <div>
                  <span>Diện tích : </span>
                  <span className="area">{`${item.area}m2`}</span>
                  <span>Khu vực : </span>
                  <span className="city">{`${renderNameDistrict(
                    item.district
                  )} , ${renderNameProvince(item.city)} `}</span>
                </div>
                <div>{item.content}</div>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
};

export default Form.create({ name: "horizontal_login" })(App);
