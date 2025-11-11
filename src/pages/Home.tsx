import { useState, type ChangeEvent } from "react";
import DropdownMenu from "../components/DropdownMenu";
import FilterCard from "../components/FilterCard";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import DashboardLayout from "../layout/DashboardLayout";
import type { MenuValueType } from "../types/dropdown.types";
import Circle from "../components/Circle";
import { Type } from "../constants/enums";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableHead } from "../constants/tableHead";
import { truncateWord } from "../helpers/truncateFunc";
import { formatDate } from "../helpers/formatDate";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import ActionModal from "../components/ActionModal";
import Button from "../components/Button";
import { useModal } from "../hooks/useModal";
import ContentModal from "../components/ContentModal";
import { Content, ContentFilters } from "../types/content.types";
import { useContents, useDeleteContent } from "../hooks/useContent";
import PublishDropdown from "../components/PublishDropdown";
import Pagination from "../components/Pagination";

const Home = () => {
  // custom hook for modal
  const { open, showOneItem, setShowOneItem, handleClose, handleOpen } =
    useModal();

  const [query, setQuery] = useState<string>("");
  const [menuValue, setMenuValue] = useState<MenuValueType>({
    postValue: "All Posts",
    statusValue: "All Status",
  });

  const [filters, setFilters] = useState<ContentFilters>({
    page: 1,
    limit: 4,
    category: "",
    publishStatus: "",
    active: "",
  });

  const { data: ContentData, isLoading, refetch } = useContents(filters);

  const deleteMutation = useDeleteContent({
    onSuccess: () => {
      refetch();
      handleClose("actionModal");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleDelete = (id: string | undefined) => {
    if (!id) return;

    deleteMutation.mutate(id);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleActions = (id: number | string, action: "Edit" | "Remove") => {
    if (!id && !action) return;

    const oneItem = ContentData?.data.find((item: Content) => item._id === id);
    if (oneItem) {
      setShowOneItem(oneItem);
    }

    switch (action) {
      case "Edit":
        handleOpen("contentModal");
        return;
      case "Remove":
        handleOpen("actionModal");
        return;
    }
  };

  const handleMenuValueByTableData = (updatedValue?: MenuValueType) => {
    if (!updatedValue) return;

    setMenuValue(updatedValue);

    if (updatedValue.postValue && updatedValue.statusValue) {
      setFilters((prev: ContentFilters) => ({
        ...prev,
        category:
          updatedValue.postValue === "All Posts" ? "" : updatedValue.postValue,
        active:
          updatedValue.statusValue === "All Status"
            ? ""
            : updatedValue.statusValue,
      }));
      refetch();
    }
  };

  const handlePageChange = (page: number) => {
    setFilters((prev: ContentFilters) => ({
      ...prev,
      page,
    }));
  };

  const handleLimitChange = (newLimit: number) => {
    setFilters((prev: ContentFilters) => ({
      ...prev,
      limit: newLimit,
      page: 1, 
    }));
  };

  return (
    <DashboardLayout>
      <PageHeader
        pageName="News & Announcements"
        btnText="Add News or Announcement"
        postCount={ContentData?.data.length}
        handleOpen={handleOpen}
      />

      {/* Filter Items */}
      <FilterCard>
        <div className="flex justify-start flex-wrap gap-3">
          <DropdownMenu
            title={menuValue.postValue!}
            setMenuValue={setMenuValue}
            type={Type.Post}
            options={[
              { id: 1, listName: "All Posts" },
              { id: 2, listName: "News" },
              { id: 3, listName: "Announcement" },
            ]}
            callback={handleMenuValueByTableData}
          />
          <DropdownMenu
            title={menuValue.statusValue!}
            setMenuValue={setMenuValue}
            type={Type.Status}
            options={[
              {
                id: 1,
                listName: "Active",
                prevIcon: <Circle color="#1DB100" />,
              },
              {
                id: 2,
                listName: "Inactive",
                prevIcon: <Circle color="#D82C2C" />,
              },
            ]}
            callback={handleMenuValueByTableData}
          />
          <SearchInput
            value={query}
            onChange={handleChange}
            name="search"
            placeholder="Search"
          />
        </div>
      </FilterCard>

      {/* Data Table */}
      <TableContainer
        component={Paper}
        sx={{ mt: "24px", boxShadow: "none", borderBottom: "0px" }}
      >
        <Table
          sx={{
            borderRadius: "8px",
            borderBottom: "0px",
            border: "1px solid #F7F7F7",
            boxShadow: "0 0 10.9px 0 rgba(235, 235, 235, 0.25)",
          }}
        >
          <TableHead>
            <TableRow>
              {tableHead.map((head: string, index: number) => (
                <TableCell
                  key={index}
                  sx={{
                    backgroundColor: "#FCFCFC",
                    border: "1px solid #F5F5F5",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <span className="text-[#243C7B] font-semibold text-[16px] leading-6 font-lato">
                    {head}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={tableHead.length}
                  sx={{ textAlign: "center", py: 5 }}
                >
                  <span className="text-[#6A7282] font-lato text-[16px]">
                    Loading...
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              ContentData?.data &&
              ContentData.data.map((data: Content) => (
                <TableRow key={data._id}>
                  <TableCell sx={{ maxWidth: "332px" }}>
                    <div className="flex items-center gap-2.5 py-2 px-3.5">
                      <div className="max-w-32 min-h-24 flex items-center justify-center">
                        <img
                          src={data.coverImage as string}
                          alt={data.title}
                          className="rounded-[10px] object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 justify-start items-start">
                        <h5 className="font-semibold font-lato text-[16px] leading-6 text-[#2A2A2A] max-w-[166px]">
                          {truncateWord(data.title, 20)}
                        </h5>
                        <span
                          className="font-normal font-lato text-[14px] leading-5 tracking-[-0.15px] text-[#6A7282] max-w-[166px]"
                          dangerouslySetInnerHTML={{
                            __html: truncateWord(data.htmlContent, 57),
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "162px" }}>
                    <div className="flex justify-center items-center">
                      <span
                        className={`${
                          data.category === "News"
                            ? "bg-[#C4DEFF] text-[#1447E6]"
                            : "bg-[#F3E8FF] text-[#8200DB]"
                        } px-3 py-1 rounded-sm leading-3 font-lato font-medium`}
                      >
                        {data.category}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "117px" }}>
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-lato text-[16px] leading-6 text-[#2A2A2A] font-medium">
                        {formatDate(data.updatedAt).date}
                      </span>
                      <span className="font-lato text-[14px] leading-5 text-[#6A7282] font-normal">
                        {formatDate(data.updatedAt).time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "112px" }}>
                    <div className="flex justify-center items-center">
                      <div
                        className={`flex gap-2.5 items-center ${
                          data.active ? "bg-[#E7FFE1]" : "bg-[#FDEEEE]"
                        } rounded-md py-1 px-3`}
                      >
                        <Circle color={data.active ? "#145E00" : "#D82C2C"} />
                        <span
                          className={`${
                            data.active ? "text-[#145E00]" : "text-[#D82C2C]"
                          } font-lato font-medium leading-6 text-base`}
                        >
                          {data.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "174px" }}>
                    <div className="flex justify-center items-center">
                      <PublishDropdown
                        itemId={data._id}
                        currentStatus={data.publishStatus}
                        // onStatusChange={handlePublishStatusChange}
                      />
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "101px" }}>
                    <div className="flex w-full justify-center items-center">
                      <span className="font-lato text-[#0A0A0A] text-base leading-6">
                        {data.author}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "78px" }}>
                    <div className="flex justify-center items-center gap-2.5">
                      <Button
                        icon={
                          <EditIcon width="16px" height="16px" fill="#243C7B" />
                        }
                        bgColor="transparent"
                        onClick={() => handleActions(data._id, "Edit")}
                      />

                      <Button
                        icon={
                          <DeleteIcon
                            width="16px"
                            height="16px"
                            fill="#D82C2C"
                          />
                        }
                        bgColor="transparent"
                        onClick={() => handleActions(data._id, "Remove")}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        currentPage={ContentData?.pagination?.page || filters.page || 1}
        totalPages={ContentData?.pagination?.totalPages || 0}
        limit={ContentData?.pagination?.limit || filters.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

      {/* Action Modal */}
      <ActionModal
        open={open.actionModal}
        showItem={showOneItem && showOneItem}
        action="Remove"
        handleClose={() => handleClose("actionModal")}
        handleDelete={handleDelete}
      />

      {/* Content Modal */}
      <ContentModal
        open={open.contentModal}
        showItem={showOneItem && showOneItem}
        handleClose={() => handleClose("contentModal")}
        refetch={refetch}
      />
    </DashboardLayout>
  );
};

export default Home;
