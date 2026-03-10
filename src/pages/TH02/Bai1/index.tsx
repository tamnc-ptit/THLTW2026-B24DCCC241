import React, { useState } from "react";
import { Button, Space, List, Typography } from "antd";

const BaiTap1: React.FC = () => {

  const choices = ["Kéo", "Búa", "Bao"];

  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const play = (playerChoice: string) => {

    const computerChoice =
      choices[Math.floor(Math.random() * choices.length)];

    let ketQua = "";

    if (playerChoice === computerChoice) {
      ketQua = "Hòa";
    } else if (
      (playerChoice === "Kéo" && computerChoice === "Bao") ||
      (playerChoice === "Búa" && computerChoice === "Kéo") ||
      (playerChoice === "Bao" && computerChoice === "Búa")
    ) {
      ketQua = "Bạn thắng";
    } else {
      ketQua = "Bạn thua";
    }

    const text = `Bạn: ${playerChoice} | Máy: ${computerChoice} → ${ketQua}`;

    setResult(text);
    setHistory([text, ...history]);
  };

  return (
    <div style={{ width: 400, margin: "auto", textAlign: "center" }}>
      <h2>Trò Chơi Oẳn Tù Tì</h2>

      <Space>
        <Button onClick={() => play("Kéo")}>Kéo</Button>
        <Button onClick={() => play("Búa")}>Búa</Button>
        <Button onClick={() => play("Bao")}>Bao</Button>
      </Space>

      <Typography.Title level={4} style={{ marginTop: 20 }}>
        {result}
      </Typography.Title>

      <h3>Lịch sử</h3>

      <List
        bordered
        dataSource={history}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default BaiTap1;