import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Edit, Plus, Trash, Users, UserPlus, UserMinus } from "lucide-react";
import { toast } from "sonner";

// Sample staff data
const initialStaff = [
  {
    id: "1",
    name: "Somchai Jaidee",
    role: "Manager",
    status: "active",
    tables: ["A1", "A2", "A3"],
    shift: "08:00 - 17:00",
    phone: "081-234-5678",
    avatar: "https://i.pravatar.cc/150?img=60",
  },
  {
    id: "2",
    name: "Ploy Srisuk",
    role: "Waiter",
    status: "active",
    tables: ["B1", "B2", "B3"],
    shift: "14:00 - 22:00",
    phone: "082-345-6789",
    avatar: "https://i.pravatar.cc/150?img=26",
  },
  {
    id: "3",
    name: "Chai Thaweesuk",
    role: "Chef",
    status: "active",
    tables: [],
    shift: "10:00 - 19:00",
    phone: "083-456-7890",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: "4",
    name: "Nong Suwannasat",
    role: "Server",
    status: "active",
    tables: ["VIP-1", "VIP-2"],
    shift: "12:00 - 21:00",
    phone: "084-567-8901",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: "5",
    name: "Wit Suwannasri",
    role: "Cook",
    status: "active",
    tables: [],
    shift: "16:00 - 24:00",
    phone: "085-678-9012",
    avatar: "https://i.pravatar.cc/150?img=55",
  },
  {
    id: "6",
    name: "Mali Sunisa",
    role: "Waiter",
    status: "off-duty",
    tables: [],
    shift: "08:00 - 17:00",
    phone: "086-789-0123",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];

const roleOptions = [
  "Manager",
  "Waiter",
  "Server",
  "Chef",
  "Cook",
  "Dishwasher",
  "Cashier",
];
const statusOptions = ["active", "off-duty", "on-leave"];

const StaffManagement = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const [newStaff, setNewStaff] = useState({
    id: "",
    name: "",
    role: "Waiter",
    status: "active",
    tables: [] as string[],
    shift: "",
    phone: "",
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
  });

  const [editStaff, setEditStaff] = useState<typeof newStaff | null>(null);

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newStaffMember = {
      ...newStaff,
      id: (staff.length + 1).toString(),
    };

    setStaff([...staff, newStaffMember]);
    setNewStaff({
      id: "",
      name: "",
      role: "Waiter",
      status: "active",
      tables: [],
      shift: "",
      phone: "",
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    });

    setIsAddingStaff(false);
    toast.success("New staff member added");
  };

  const handleEditStaff = (id: string) => {
    const staffMember = staff.find((s) => s.id === id);
    if (staffMember) {
      setEditStaff({ ...staffMember });
    }
  };

  const handleUpdateStaff = () => {
    if (!editStaff || !editStaff.name || !editStaff.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    setStaff(staff.map((s) => (s.id === editStaff.id ? editStaff : s)));
    setEditStaff(null);
    toast.success("Staff information updated");
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id));
    toast.success("Staff member removed");
  };

  const handleChangeStatus = (id: string, status: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, status } : s)));
    const staffMember = staff.find((s) => s.id === id);
    if (staffMember) {
      toast.success(`${staffMember.name}'s status changed to ${status}`);
    }
  };

  const filteredStaff =
    filter === "all"
      ? staff
      : staff.filter((s) => s.role === filter || s.status === filter);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">
            Manage restaurant staff and assign responsibilities
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="off-duty">Off Duty</SelectItem>
              <SelectItem value="Manager">Managers</SelectItem>
              <SelectItem value="Waiter">Waiters</SelectItem>
              <SelectItem value="Chef">Kitchen Staff</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isAddingStaff} onOpenChange={setIsAddingStaff}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, name: e.target.value })
                    }
                    placeholder="e.g., Somchai Jaidee"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      defaultValue={newStaff.role}
                      onValueChange={(value) =>
                        setNewStaff({ ...newStaff, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      defaultValue={newStaff.status}
                      onValueChange={(value) =>
                        setNewStaff({ ...newStaff, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status === "active"
                              ? "Active"
                              : status === "off-duty"
                              ? "Off Duty"
                              : "On Leave"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shift">Shift</Label>
                    <Input
                      id="shift"
                      value={newStaff.shift}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, shift: e.target.value })
                      }
                      placeholder="e.g., 08:00 - 17:00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newStaff.phone}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, phone: e.target.value })
                      }
                      placeholder="e.g., 081-234-5678"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddStaff}>Add Staff Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <Card key={member.id} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="rounded-full w-16 h-16 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="font-normal capitalize"
                        >
                          {member.role}
                        </Badge>
                        <Badge
                          className={`
                            ${member.status === "active" ? "bg-green-500" : ""}
                            ${member.status === "off-duty" ? "bg-gray-500" : ""}
                            ${
                              member.status === "on-leave"
                                ? "bg-orange-500"
                                : ""
                            }
                          `}
                        >
                          {member.status === "active"
                            ? "Active"
                            : member.status === "off-duty"
                            ? "Off Duty"
                            : "On Leave"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Dialog
                      open={editStaff?.id === member.id}
                      onOpenChange={(open) => {
                        if (!open) setEditStaff(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditStaff(member.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Staff Member</DialogTitle>
                        </DialogHeader>

                        {editStaff && (
                          <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-2">
                              <Label htmlFor="edit-name">Full Name</Label>
                              <Input
                                id="edit-name"
                                value={editStaff.name}
                                onChange={(e) =>
                                  setEditStaff({
                                    ...editStaff,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-role">Role</Label>
                                <Select
                                  value={editStaff.role}
                                  onValueChange={(value) =>
                                    setEditStaff({ ...editStaff, role: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {roleOptions.map((role) => (
                                      <SelectItem key={role} value={role}>
                                        {role}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                  value={editStaff.status}
                                  onValueChange={(value) =>
                                    setEditStaff({
                                      ...editStaff,
                                      status: value,
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {statusOptions.map((status) => (
                                      <SelectItem key={status} value={status}>
                                        {status === "active"
                                          ? "Active"
                                          : status === "off-duty"
                                          ? "Off Duty"
                                          : "On Leave"}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="edit-shift">Shift</Label>
                                <Input
                                  id="edit-shift"
                                  value={editStaff.shift}
                                  onChange={(e) =>
                                    setEditStaff({
                                      ...editStaff,
                                      shift: e.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div>
                                <Label htmlFor="edit-phone">Phone Number</Label>
                                <Input
                                  id="edit-phone"
                                  value={editStaff.phone}
                                  onChange={(e) =>
                                    setEditStaff({
                                      ...editStaff,
                                      phone: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleUpdateStaff}>Update</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteStaff(member.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm">{member.phone || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Shift</p>
                      <p className="text-sm">
                        {member.shift || "Not scheduled"}
                      </p>
                    </div>
                  </div>

                  {/* Table Assignments */}
                  {member.role === "Waiter" || member.role === "Server" ? (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">
                        Assigned Tables
                      </p>
                      {member.tables && member.tables.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {member.tables.map((table) => (
                            <Badge key={table} variant="outline">
                              Table {table}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No tables assigned
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Action buttons */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    {member.status === "active" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() =>
                          handleChangeStatus(member.id, "off-duty")
                        }
                      >
                        <UserMinus className="mr-1 h-4 w-4" /> Set Off Duty
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleChangeStatus(member.id, "active")}
                      >
                        <UserPlus className="mr-1 h-4 w-4" /> Set Active
                      </Button>
                    )}

                    {(member.role === "Waiter" || member.role === "Server") && (
                      <Button variant="outline" size="sm">
                        Assign Tables
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Users className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium">No Staff Found</h3>
          <p className="text-sm mt-2">
            No staff members matching your filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
