import React, { useState } from "react";
import { Input, Button, Space, List, Select, Typography } from "antd";

const { Option } = Select;

const BaiTap2: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [maMon, setMaMon] = useState("");
  const [tenMon, setTenMon] = useState("");
  const [tinChi, setTinChi] = useState("");
  const addSubject = () => {
    const newSubject = {
      ma: maMon,
      ten: tenMon,
      tinchi: tinChi
    };

    setSubjects([...subjects, newSubject]);
    setMaMon("");
    setTenMon("");
    setTinChi("");
  };


  const [questions, setQuestions] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      subject: subject,
      content: content,
      level: level
    };

    setQuestions([...questions, newQuestion]);
    setContent("");
  };


  const [searchLevel, setSearchLevel] = useState("");

  const filteredQuestions = questions.filter(q =>
    (!searchLevel || q.level === searchLevel)
  );


  const [exam, setExam] = useState<any[]>([]);
  const createExam = () => {
    const easy = questions.filter(q => q.level === "Dễ").sort(()=> 0.5 - Math.random()).slice(0,2);
    const medium = questions.filter(q => q.level === "Trung bình").sort(()=> 0.5 - Math.random()).slice(0,2);
    const hard = questions.filter(q => q.level === "Khó").sort(()=> 0.5 - Math.random()).slice(0,1);

    if(easy.length < 2 || medium.length < 2 || hard.length < 1){
      alert("Không đủ câu hỏi để tạo đề");
      return;
    }

    setExam([...easy,...medium,...hard]);
  };

  return (
    <div style={{ width: 600, margin: "auto" }}>

      <Typography.Title level={3}>
        Quản lý ngân hàng câu hỏi
      </Typography.Title>

      <Typography.Title level={4}>Thêm môn học</Typography.Title>

      <Space>
        <Input
          placeholder="Mã môn"
          value={maMon}
          onChange={(e)=>setMaMon(e.target.value)}
        />

        <Input
          placeholder="Tên môn"
          value={tenMon}
          onChange={(e)=>setTenMon(e.target.value)}
        />

        <Input
          placeholder="Tín chỉ"
          value={tinChi}
          onChange={(e)=>setTinChi(e.target.value)}
        />

        <Button type="primary" onClick={addSubject}>
          Thêm
        </Button>
      </Space>

      <List
        bordered
        dataSource={subjects}
        renderItem={(item)=>(
          <List.Item>
            {item.ma} - {item.ten} ({item.tinchi} tín chỉ)
          </List.Item>
        )}
        style={{marginTop:20}}
      />


      <Typography.Title level={4} style={{marginTop:30}}>
        Thêm câu hỏi
      </Typography.Title>

      <Space direction="vertical" style={{width:"100%"}}>

        <Input
          placeholder="Nội dung câu hỏi"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />

        <Select
          placeholder="Chọn môn học"
          onChange={(value)=>setSubject(value)}
        >
          {subjects.map(s=>(
            <Option key={s.ma} value={s.ma}>
              {s.ten}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Mức độ"
          onChange={(value)=>setLevel(value)}
        >
          <Option value="Dễ">Dễ</Option>
          <Option value="Trung bình">Trung bình</Option>
          <Option value="Khó">Khó</Option>
          <Option value="Rất khó">Rất khó</Option>
        </Select>

        <Button type="primary" onClick={addQuestion}>
          Thêm câu hỏi
        </Button>

      </Space>



      <Typography.Title level={4} style={{marginTop:30}}>
        Tìm kiếm câu hỏi
      </Typography.Title>

      <Select
        placeholder="Lọc theo mức độ"
        style={{width:200}}
        onChange={(value)=>setSearchLevel(value)}
      >
        <Option value="">Tất cả</Option>
        <Option value="Dễ">Dễ</Option>
        <Option value="Trung bình">Trung bình</Option>
        <Option value="Khó">Khó</Option>
        <Option value="Rất khó">Rất khó</Option>
      </Select>

      <List
        bordered
        dataSource={filteredQuestions}
        renderItem={(item)=>(
          <List.Item>
            {item.content} - {item.level}
          </List.Item>
        )}
        style={{marginTop:20}}
      />


      <Typography.Title level={4} style={{marginTop:30}}>
        Tạo đề thi
      </Typography.Title>

      <Button type="primary" onClick={createExam}>
        Tạo đề
      </Button>

      <List
        bordered
        dataSource={exam}
        renderItem={(item,index)=>(
          <List.Item>
            Câu {index+1}: {item.content} ({item.level})
          </List.Item>
        )}
        style={{marginTop:20}}
      />

    </div>
  );
};

export default BaiTap2;