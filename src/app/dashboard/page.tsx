"use client";

//React Imports
import React, { ChangeEvent, useContext, useRef, useState } from "react";

// Next Imports
import Image from "next/image";

// UI Imports
import {
  Button,
  Checkbox,
  Drawer,
  IconButton,
  InputAdornment,
  MenuItem,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";

// UI Component Imports
import SelectDropdown from "@/components/FormComponents/SelectDropdown";
import FormInput from "@/components/FormComponents/FormInput";
import DocumentUploadModal from "@/components/DocumentUploadModal";

// Third party Imports
import dayjs from "dayjs";

// Context Imports
import { ColorModeContext } from "@/store/context/ThemeContext";

// Icon Imports
import { LuSendHorizonal } from "react-icons/lu";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

// Utils Imports
import { preventDefaultHandler } from "@/utils/CommonFunctions";
import { COLORS } from "../useAppTheme";

const drawerWidth = 300;

const DUMMY_CHATS = [
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
  {
    created_at: Date.now(),
    chats: ["chat 1", "chat 2", "chat 3", "chat 4"],
  },
];

const DUMMYFILES = [
  { label: "file1", value: 1 },
  { label: "file2", value: 2 },
  { label: "file3", value: 3 },
];

function Dashboard() {
  // const { window } = props;
  const theme = useTheme();
  // const container: any =
  //   window !== undefined ? () => window().document.body : undefined;
  const { mode } = useContext(ColorModeContext);
  const [files, setFiles] = useState<File[] | []>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showChatsSideBar, setShowChatsSideBar] = useState<boolean>(true);
  const [showUploadFileModal, setShowUploadFileModal] =
    useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleFileRemove = (file: File) => {
    const updatedFiles = files.filter((item) => item.name !== file.name);
    setFiles(updatedFiles);
  };

  const handleFileAdd = (filesList: File[]) => {
    setFiles(filesList);
    setShowUploadFileModal(true);
  };

  return (
    <div
      id="chat-container"
      className="max-h-svh h-svh w-full py-12 md:p-12 flex relative"
    >
      <Slide direction="right" in={showChatsSideBar} mountOnEnter unmountOnExit>
        <div
          id="chat-left-content"
          className="w-2/12 hidden md:flex flex-col items-center p-4 h-full"
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <FormInput
            variant="standard"
            optional
            placeholder="Search Chats"
            className="[&_div]:before:border-b-primary-color [&_div]:before:border-b-2"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="mr-0.5"
                    aria-label="search chats"
                    edge="end"
                  >
                    <IoSearchOutline color={theme.palette.primary.main} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="overflow-y-auto max-h-[90svh] p-4 w-full">
            {DUMMY_CHATS.map((chat, i) => {
              return (
                <div key={i} className="p-2 flex flex-col text-start">
                  <Typography className="text-[10px] italic">
                    {dayjs(chat.created_at).format("MMM DD, YYYY")}
                  </Typography>
                  {chat.chats.map((queryChat, i) => {
                    return (
                      <Typography key={i} className="py-2">
                        {queryChat}
                      </Typography>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Slide>
      <div
        id="chat-right-content"
        className={`${
          showChatsSideBar ? "w-full md:w-10/12" : "w-full"
        } h-full px-4 md:px-8 flex flex-col justify-between relative`}
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <IconButton
          aria-label="chats visibility"
          className="absolute hidden md:flex top-1/4 left-6 bg-white shadow-md p-2"
          onClick={() => setShowChatsSideBar((prev) => !prev)}
        >
          <BsArrowsExpandVertical
            color={theme.palette.primary.main}
            className="text-sm font-bold"
          />
        </IconButton>
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8 flex-none">
          <div className="flex flex-col md:flex-row w-full items-center min-w-[200px] md:w-4/6">
            <div className="flex items-center justify-center w-full md:w-5/6">
              <IconButton
                aria-label="chats visibility"
                className="flex md:hidden bg-white shadow-md mr-2 p-2"
                onClick={handleDrawerToggle}
              >
                <HiOutlineMenuAlt2 className="text-sm font-bold text-black" />
              </IconButton>
              <Typography className="text-[0.6rem] md:text-sm pr-2">
                Select files
              </Typography>
              <div className="w-4/6">
                <SelectDropdown
                  optional
                  options={[{ label: "none", value: "" }, ...DUMMYFILES]}
                  placeholder="Max. 3 files"
                  multiple
                  // disabled={files.length === 0}
                  className="min-w-[150px]"
                  renderOption={(optionProps: any, option: SelectItemProps) => {
                    const { key, ...restProps } = optionProps;
                    if (option.label === "none") {
                      return (
                        <MenuItem
                          key={key}
                          {...restProps}
                          className={`${
                            restProps["data-option-index"] % 2 === 0
                              ? mode === "light"
                                ? "bg-[#F5F5FF]"
                                : "bg-[#0E0E27]"
                              : mode === "light"
                              ? "bg-[#F8F8FA]"
                              : "bg-[#2C2738]"
                          } p-1 pl-0 mb-2 border-transparent text-[#999]`}
                        >
                          <Checkbox />
                          <p
                            className="text-semibold text-sm"
                            style={{
                              color: theme.palette.text.primary,
                            }}
                          >
                            None
                          </p>
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem
                          key={key}
                          {...restProps}
                          className={`${
                            restProps["data-option-index"] % 2 === 0
                              ? mode === "light"
                                ? "bg-[#F5F5FF]"
                                : "bg-[#0E0E27]"
                              : mode === "light"
                              ? "bg-[#F8F8FA]"
                              : "bg-[#2C2738]"
                          } p-1 pl-0 mb-2 border-transparent text-[#999]`}
                        >
                          <Checkbox />
                          <Image
                            src="/images/FileUploadDocument.png"
                            height={20}
                            width={20}
                            className="mr-2"
                            alt="File upload"
                          />
                          <p className="text-gray-500 text-sm">
                            {option.label}
                          </p>
                        </MenuItem>
                      );
                    }
                  }}
                />
              </div>
            </div>
            {/* {files.length > 0 && ( */}
            {/* <Typography
              className="text-[0.6rem] md:text-sm text-end md:text-start mt-2 w-full md:pl-2 md:mt-0 font-semibold md:w-1/6"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              View files
            </Typography> */}
            {/* )} */}
          </div>
          <Button
            variant="outlined"
            className="capitalize w-fit font-semibold p-2 px-8 shadow-lg hidden md:flex"
          >
            <FaPlus className="mx-2" /> New Chat
          </Button>
        </div>
        <div
          className="w-full p-4 flex flex-col items-center justify-center flex-1 shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.3)] rounded-lg"
          style={{
            backgroundColor:
              theme.palette.background[
                `${mode === "light" ? "default" : "paper"}`
              ],
          }}
        >
          <div
            className="w-full md:w-2/6"
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
            {/* {files.length > 0 ? (
              <div className="flex flex-col p-8 items-center justify-center">
                {files.map((item, i) => {
                  return (
                    <div
                      className="flex items-center justify-between w-full"
                      key={i}
                    >
                      <Typography>{item.name}</Typography>
                      <IconButton
                        className="mx-2"
                        onClick={() => handleFileRemove(item)}
                      >
                        <MdCancel className="text-red-500" />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            ) : ( */}
            <label
              className="flex justify-center w-full p-8 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
              style={{
                backgroundColor: theme.palette.background.default,
              }}
            >
              <span className="flex flex-col items-center space-x-2 text-xs">
                <Image
                  src="/images/FileUploadDocument.png"
                  height={40}
                  width={40}
                  className="my-4"
                  alt="File upload"
                />
                <Typography
                  className="font-semibold text-sm md:text-md"
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  Drag & Drop or click to upload
                </Typography>
                <Typography className=" text-sm md:text-md">or</Typography>
                <Typography className=" text-sm md:text-md">
                  Select Files from the above listings
                </Typography>
              </span>
            </label>
          </div>
          <Button
            variant="contained"
            className="capitalize w-full md:w-2/6 my-4"
          >
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
        <FormInput
          optional={true}
          className="flex-none mt-6"
          placeholder="Type your message..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LuSendHorizonal className="text-2xl m-2 text-[#aaa]" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <div
          id="chat-left-content"
          className="w-full flex flex-col items-center justify-center p-4 h-full"
          style={{
            backgroundColor:
              theme.palette.background[
                `${mode === "light" ? "default" : "paper"}`
              ],
          }}
        >
          <Button
            variant="outlined"
            className="capitalize w-fit font-semibold p-2 px-8 shadow-md mb-6"
          >
            <FaPlus className="mx-2" /> New Chat
          </Button>
          <FormInput
            variant="standard"
            optional
            placeholder="Search Chats"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search chats" edge="end">
                    <IoSearchOutline color={theme.palette.primary.main} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="overflow-y-auto max-h-[90svh] p-4 w-full">
            {DUMMY_CHATS.map((chat, i) => {
              return (
                <div key={i} className="p-2 flex flex-col text-start">
                  <Typography className="text-[10px] italic">
                    {dayjs(chat.created_at).format("MMM DD, YYYY")}
                  </Typography>
                  {chat.chats.map((queryChat, i) => {
                    return (
                      <Typography key={i} className="py-2">
                        {queryChat}
                      </Typography>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
      <DocumentUploadModal
        open={showUploadFileModal}
        handleToggle={() => setShowUploadFileModal((prev) => !prev)}
      />
    </div>
  );
}

export default Dashboard;
