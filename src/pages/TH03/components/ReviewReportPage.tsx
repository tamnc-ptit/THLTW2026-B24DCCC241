import { useState } from "react";
import { Table, Button, Rate, Input, Modal, Form } from "antd";

interface Appointment {
  id: number;
  customer: string;
  employee: string;
  service: string;
  date: string;
  price: number;
  status: string;
}

interface Review {
  id: number;
  appointmentId: number;
  employee: string;
  rating: number;
  comment: string;
  reply?: string;
}

const ReviewReportPage: React.FC = () => {

  const [appointments] = useState<Appointment[]>([
    { id: 1, customer: "Nam", employee: "Anh", service: "Cắt tóc", date:"2026-03-17", price:100, status: "Hoàn thành"},
    { id: 2, customer: "Lan", employee: "Bình", service: "Massage", date:"2026-03-17", price:200, status: "Hoàn thành"},
    { id: 3, customer: "Huy", employee: "Anh", service: "Gội đầu", date:"2026-03-18", price:80, status: "Xác nhận"}
  ]);

  const [reviews,setReviews] = useState<Review[]>([]);
  const [open,setOpen] = useState(false);
  const [current,setCurrent] = useState<Appointment | null>(null);
  const [form] = Form.useForm();

  const openReview = (record:Appointment)=>{
    setCurrent(record);
    setOpen(true);
  };

  const saveReview = (values:any)=>{

    const newReview:Review = {
      id:Date.now(),
      appointmentId:current!.id,
      employee:current!.employee,
      rating:values.rating,
      comment:values.comment
    };

    setReviews([...reviews,newReview]);
    setOpen(false);
    form.resetFields();
  };

  const replyReview = (id:number,reply:string)=>{

    const updated = reviews.map(r =>
      r.id === id ? {...r,reply} : r
    );

    setReviews(updated);
  };

  const averageRating = (employee:string)=>{

    const empReviews = reviews.filter(r=>r.employee === employee);

    if(empReviews.length === 0) return 0;

    const total = empReviews.reduce((sum,r)=>sum+r.rating,0);

    return (total/empReviews.length).toFixed(1);
  };

  const statsByDate:any = {};

  appointments.forEach(a=>{
    if(!statsByDate[a.date]){
      statsByDate[a.date] = 0;
    }
    statsByDate[a.date]++;
  });

  const dateData = Object.entries(statsByDate).map(([date,total])=>({
    key:date,
    date,
    total
  }));


  const revenueByService:any = {};

  appointments.forEach(a=>{
    if(!revenueByService[a.service]){
      revenueByService[a.service] = 0;
    }
    revenueByService[a.service]+=a.price;
  });

  const serviceData = Object.entries(revenueByService).map(([service,total])=>({
    key:service,
    service,
    total
  }));


  const revenueByEmployee:any = {};

  appointments.forEach(a=>{
    if(!revenueByEmployee[a.employee]){
      revenueByEmployee[a.employee] = 0;
    }
    revenueByEmployee[a.employee]+=a.price;
  });

  const employeeData = Object.entries(revenueByEmployee).map(([employee,total])=>({
    key:employee,
    employee,
    total
  }));


  const appointmentColumns = [
    {title:"Khách",dataIndex:"customer"},
    {title:"Nhân viên",dataIndex:"employee"},
    {title:"Dịch vụ",dataIndex:"service"},
    {title:"Trạng thái",dataIndex:"status"},
    {
      title:"Đánh giá",
      render:(record:Appointment)=>{

        if(record.status !== "Hoàn thành") return "Chưa thể đánh giá";

        const reviewed = reviews.find(r=>r.appointmentId === record.id);

        if(reviewed)
          return <Rate disabled defaultValue={reviewed.rating}/>;

        return <Button type="primary" onClick={()=>openReview(record)}>Đánh giá</Button>;
      }
    }
  ];

  const reviewColumns = [
    {title:"Nhân viên",dataIndex:"employee"},
    {
      title:"Rating",
      render:(record:Review)=><Rate disabled defaultValue={record.rating}/>
    },
    {title:"Comment",dataIndex:"comment"},
    {
      title:"Phản hồi",
      render:(record:Review)=>{

        if(record.reply) return record.reply;

        let text="";

        return(
          <>
            <Input onChange={(e)=>text=e.target.value}/>
            <Button onClick={()=>replyReview(record.id,text)}>Gửi</Button>
          </>
        )
      }
    }
  ];

  return (
    <div>

      <h2>Lịch hẹn</h2>

      <Table
        dataSource={appointments}
        columns={appointmentColumns}
        rowKey="id"
      />

      <h2 style={{marginTop:40}}>Đánh giá</h2>

      <Table
        dataSource={reviews}
        columns={reviewColumns}
        rowKey="id"
      />

      <h2 style={{marginTop:40}}>Rating trung bình nhân viên</h2>

      <ul>
        {[...new Set(appointments.map(a=>a.employee))].map(e=>(
          <li key={e}>{e} ⭐ {averageRating(e)}</li>
        ))}
      </ul>

      <h2 style={{marginTop:40}}>Thống kê lịch hẹn theo ngày</h2>

      <Table
        dataSource={dateData}
        columns={[
          {title:"Ngày",dataIndex:"date"},
          {title:"Số lịch",dataIndex:"total"}
        ]}
      />

      <h2 style={{marginTop:40}}>Doanh thu theo dịch vụ</h2>

      <Table
        dataSource={serviceData}
        columns={[
          {title:"Dịch vụ",dataIndex:"service"},
          {title:"Doanh thu",dataIndex:"total"}
        ]}
      />

      <h2 style={{marginTop:40}}>Doanh thu theo nhân viên</h2>

      <Table
        dataSource={employeeData}
        columns={[
          {title:"Nhân viên",dataIndex:"employee"},
          {title:"Doanh thu",dataIndex:"total"}
        ]}
      />

      <Modal
        visible={open} 
        onCancel={()=>setOpen(false)}
        footer={null}
        title="Đánh giá dịch vụ"
      >

        <Form form={form} onFinish={saveReview}>

          <Form.Item name="rating" label="Số sao" rules={[{required:true}]}>
            <Rate/>
          </Form.Item>

          <Form.Item name="comment" label="Bình luận">
            <Input.TextArea/>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Gửi đánh giá
          </Button>

        </Form>

      </Modal>

    </div>
  );
};

export default ReviewReportPage;