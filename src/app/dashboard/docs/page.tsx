"use client";

// React Imports
import React, { ChangeEvent, useContext, useRef, useState } from "react";

// Next Imports
import Image from "next/image";

// UI Imports
import {
  Button,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// UI components Imports
import DocumentUploadModal from "@/components/DocumentUploadModal";
import FormInput from "@/components/FormComponents/FormInput";
import SelectDropdownAutocomplete from "@/components/FormComponents/SelectDropdown";

// Third party Imports
import dayjs from "dayjs";

// Icons Imports
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

// Context Imports
import { ColorModeContext } from "@/appStateStore/context/ThemeContext";

// Utils Imports
import { preventDefaultHandler } from "@/utils/CommonFunctions";
import DeleteModal from "@/components/DeleteModal";

const Categories = [
  { label: "Social(2)", value: "w" },
  { label: "General(10)", value: "3" },
  { label: "Miscellaneous(5)", value: "f" },
];

const rows = [
  { id: 1, filename: "Snow", size: "230kb", date: 14 },
  { id: 2, filename: "Lannister", size: "230kb", date: 31 },
  { id: 3, filename: "Lannister", size: "230kb", date: 31 },
  { id: 4, filename: "Stark", size: "230kb", date: 11 },
  { id: 5, filename: "Targaryen", size: "230kb", date: null },
  { id: 6, filename: "Melisandre", size: "230kb", date: 150 },
  { id: 7, filename: "Clifford", size: "230kb", date: 44 },
  { id: 8, filename: "Frances", size: "230kb", date: 36 },
  { id: 9, filename: "Roxie", size: "230kb", date: 65 },
  { id: 10, filename: "Roxie", size: "230kb", date: 65 },
];

const Docs = () => {
  const theme = useTheme();
  const { mode } = useContext(ColorModeContext);
  const [allFiles, setAllFiles] = useState([1]);
  const [files, setFiles] = useState<File[] | []>([]);
  const [showDeleteFileModal, setShowDeleteFileModal] =
    useState<boolean>(false);
  const [showUploadFileModal, setShowUploadFileModal] =
    useState<boolean>(false);

  const handleFileAdd = (filesList: File[]) => {
    setFiles(filesList);
    setShowUploadFileModal(true);
    console.log("clo");
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "filename",
      headerName: "File Name",
      minWidth: 300,
      flex: 3,
      editable: false,
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <Image
            src="/images/FileUploadDocument.png"
            height={20}
            width={20}
            className="mr-2"
            alt="File upload"
          />
          <p className="text-[#5259F6] underline">{params.row.filename}</p>
        </div>
      ),
    },
    {
      field: "size",
      headerName: "Size",
      width: 150,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      // type: "date",
      width: 110,
      editable: false,
      renderCell: (params) => (
        <div className="flex items-center justify-around h-full">
          {dayjs(Date.now()).format("DD/MM/YY")}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center justify-around h-full">
          <FiEdit />
          <BsTrash
            className="cursor-pointer"
            onClick={() => setShowDeleteFileModal(true)}
          />
        </div>
      ),
    },
  ];

  return (
    <div id="documents-containter" className="p-6 md:p-12 h-full w-full">
      <div
        className="rounded-md shadow-lg min-h-[80svh] w-full p-4 md:p-10 flex flex-col md:flex-row"
        style={{
          backgroundColor:
            theme.palette.background[
              `${mode === "light" ? "default" : "paper"}`
            ],
        }}
      >
        <div className="w-full md:w-4/6 h-full">
          <FormInput
            placeholder="Search Documents"
            className="[&_div]:h-[50px] [&_fieldset]:!border-primary-color"
            optional
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="search chats"
                    className="ml-2"
                    edge="start"
                  >
                    <IoSearchOutline color="grey" />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button className="bg-primary-color capitalize text-white px-8 h-[50px] z-10 shadow-none rounded-l-none">
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {allFiles.length < 1 && (
            <Image
              priority
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto object-contain"
              src="/images/DocumentUploadImage.png"
              alt="documents"
            />
          )}
          {allFiles.length > 0 && (
            <div className="h-full w-full py-4">
              <div className="flex flex-col-reverse md:flex-row">
                <div className="w-full my-4 md:my-0 md:w-9/12 flex gap-2 flex-wrap">
                  {Categories.map((val, index) => {
                    return (
                      <p
                        key={index}
                        className={`text-xs p-2 h-fit rounded-md ${
                          mode === "light"
                            ? "border-2 border-solid border-gray-300"
                            : "bg-[#212121]"
                        }`}
                        style={{ color: theme.palette.text.primary }}
                      >
                        {val.label}
                      </p>
                    );
                  })}
                </div>
                <div className="w-full my-4 md:my-0 md:w-3/12 flex items-center">
                  <p
                    className="text-sm min-w-[50px] mr-2"
                    style={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    Sort by
                  </p>
                  <SelectDropdownAutocomplete
                    options={Categories}
                    optional
                    placeholder="Newest"
                    onChange={(e: SelectItemProps) =>
                      console.log(e ? e.value : "")
                    }
                  />
                </div>
              </div>
              <div className="pt-3 h-[70svh]">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowClassName={(params) =>
                    `${
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? mode === "light"
                          ? "bg-[#F5F5FF]"
                          : "bg-[#0E0E27]"
                        : mode === "light"
                        ? "bg-[#F8F8FA]"
                        : "bg-[#2C2738]"
                    } mt-4 rounded-md border-transparent text-[#999]`
                  }
                  sx={{
                    border: "none",
                    borderRadius: "0px",
                    "&, [class^=MuiDataGrid]": { border: "none" },
                    "& .MuiDataGrid-columnHeaders": {
                      borderRadius: "0px",

                      "& div": {
                        backgroundColor:
                          mode === "light" ? "lightgrey!important" : "#404040",
                        borderRadius: "0px",
                      },
                    },
                  }}
                  rowCount={10}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[10]}
                  hideFooter
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </div>
              <div className="flex items-center justify-between mt-8">
                <Button className="capitalize">
                  <FaAngleLeft /> Previous
                </Button>
                <Button className="capitalize px-12" variant="contained">
                  Start chat
                </Button>
                <Button className="capitalize">
                  Next <FaAngleRight />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-2/6 h-full">
          <div className="w-full px-10 flex flex-col items-center justify-center">
            <div
              className="w-full"
              onDragOver={(e) => {
                preventDefaultHandler(e);
              }}
              onDragEnter={(e) => {
                preventDefaultHandler(e);
              }}
              onDragLeave={(e) => {
                preventDefaultHandler(e);
              }}
              onDrop={(e) => {
                preventDefaultHandler(e);
                const filesList = Array.from(e.dataTransfer.files);
                handleFileAdd(filesList);
              }}
            >
              <label
                className="flex justify-center w-full p-4 transition border-2 border-gray-400 border-dashed appearance-none cursor-pointer hover:border-gray-500 focus:outline-none"
                style={{
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <span className="flex flex-col items-center space-x-2">
                  <Image
                    src="/images/FileUploadDocument.png"
                    height={40}
                    width={40}
                    className="my-4"
                    alt="File upload"
                  />
                  <Typography
                    className="font-semibold text-sm"
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    Drag & Drop or click to upload
                  </Typography>
                </span>
              </label>
            </div>
            <Button variant="contained" className="capitalize w-full my-4">
              <label className="w-full p-2">
                Upload Documents
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files?.length) {
                      const filesList = Array.from(e.target.files);
                      handleFileAdd(filesList);
                    }
                  }}
                  type="file"
                  name="file_upload"
                  className="hidden"
                />
              </label>
            </Button>
          </div>
          <div className="w-full flex items-center justify-center">
            {allFiles.length > 0 && (
              <Image
                priority
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto object-contain"
                src={
                  mode === "light"
                    ? "/images/DocumentUploadImage.png"
                    : "/images/DocumentUploadDark.png"
                }
                alt="documents"
              />
            )}
          </div>
        </div>
      </div>
      <DocumentUploadModal
        open={showUploadFileModal}
        handleToggle={() => setShowUploadFileModal((prev) => !prev)}
      />
      <DeleteModal
        open={showDeleteFileModal}
        handleToggle={() => setShowDeleteFileModal((prev) => !prev)}
      />
    </div>
  );
};

export default Docs;
