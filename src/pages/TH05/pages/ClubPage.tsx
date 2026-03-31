import { useState } from "react";
import { Button, Input, Space } from "antd";
import type { Club, Member, ClubFormValues } from "../types/type";

import ClubTable from "../components/ClubTable";
import ClubFormModal from "../components/ClubFormModal";
import MemberListModal from "../components/MemberListModal";

interface Props {
  clubs: Club[];
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>;
}



const mockMembers: Member[] = [
  {
    id: 1,
    name: "Nguyễn B",
    email: "b@gmail.com",
    phone: "0123",
    joinDate: "2023-01-01",
    role: "member",
    clubId: 1,
  },
];

const ClubPage = ({ clubs, setClubs }: Props) => {

  const [members, setMembers] = useState<Member[]>([]);

  const [selectedClub, setSelectedClub] = useState<Club | undefined>();

  const [openForm, setOpenForm] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);

  const [search, setSearch] = useState("");

  const handleAdd = () => {
    setSelectedClub(undefined);
    setOpenForm(true);
  };

  const handleEdit = (club: Club) => {
    setSelectedClub(club);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setClubs(prev => prev.filter(c => c.id !== id));
  };

  const handleSubmit = (values: ClubFormValues) => {
    if (selectedClub) {
      setClubs(prev =>
        prev.map(c =>
          c.id === selectedClub.id ? { ...c, ...values } : c
        )
      );
    } else {
      const newClub: Club = {
        id: Date.now(),
        ...values,
      };
      setClubs(prev => [...prev, newClub]);
    }

    setOpenForm(false);
  };

  const handleViewMembers = (club: Club) => {
    setSelectedClub(club);

    const filtered = mockMembers.filter(m => m.clubId === club.id);
    setMembers(filtered);

    setOpenMembers(true);
  };

  const filteredClubs = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý câu lạc bộ</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm CLB..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Button type="primary" onClick={handleAdd}>
          + Thêm CLB
        </Button>
      </Space>

      <ClubTable
        data={filteredClubs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewMembers={handleViewMembers}
      />

      <ClubFormModal
        open={openForm}
        initialValues={selectedClub}
        onSubmit={handleSubmit}
        onCancel={() => setOpenForm(false)}
      />

      <MemberListModal
        open={openMembers}
        members={members}
        onClose={() => setOpenMembers(false)}
      />
    </div>
  );
};

export default ClubPage;