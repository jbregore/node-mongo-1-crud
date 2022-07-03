import React, { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import FileBase from "react-file-base64";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllPets,
  addPet,
  deletePet,
  updatePet,
  searchPet,
} from "../redux/action/petsAction";
import PetPagination from "./PetPagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SampleTable() {
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const { petList, totalPets } = useSelector((state) => state.pets);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [search, setSearch] = useState("");

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  const page = query.get("page") || 1;

  const initialFormData = {
    name: "",
    breed: "",
    owner: "",
    description: "",
    selectedFile: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // useEffect(() => {
  //   dispatch(getAllPets());
  // }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const previewFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    // dispatch(addPet(uploadData));
    // console.log(uploadData);

    if (isEdit) {
      if (image) {
        let uploadData = new FormData();
        uploadData.append("image", fileInputRef.current.files[0]);

        dispatch(updatePet(formData, uploadData, editId));
        setFormData(initialFormData);
        setIsEdit(false);
        setPreview("");
        setImage(null);
        return;
      } else {
        dispatch(updatePet(formData, "", editId));
        setFormData(initialFormData);
        setIsEdit(false);
        setPreview("");
        setImage(null);
        return;
      }

      // dispatch(updatePet(formData, editId));
      // // console.log(formData)
      // setFormData(initialFormData);
      // setIsEdit(false);
      // setPreview("");
    } else {
      if (image) {
        let uploadData = new FormData();
        uploadData.append("image", fileInputRef.current.files[0]);

        dispatch(addPet(formData, uploadData));
        setFormData(initialFormData);
        setPreview("");
        setImage(null);
      } else {
        dispatch(addPet(formData, ""));
        setFormData(initialFormData);
        setPreview("");
        setImage(null);
      }
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePet(id));
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      breed: item.breed,
      owner: item.owner,
      description: item.description,
      selectedFile: item.selectedFile,
    });
    setIsEdit(true);
    setEditId(item._id);
  };

  const logout = () => {
    removeCookie("jwt");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#efefef",
        margin: 0,
        padding: 0,
        flexDirection: "column",
      }}
    >
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
      <div style={{ float: "left", width: "80%" }}>
        <TextField
          label="Search"
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              dispatch(searchPet(search));
            }
          }}
        />
      </div>

      <Grid container style={{ width: "80%" }}>
        <Grid item xs={9}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Breed</TableCell>
                  <TableCell align="left">Owner</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petList &&
                  petList?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.breed}</TableCell>
                      <TableCell align="left">{row.owner}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        <img
                          src={row.selectedFile}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          style={{
                            marginRight: 5,
                            backgroundColor: "#009900",
                          }}
                          size="small"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          style={{ marginRight: 5 }}
                          size="small"
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={3} style={{ textAlign: "center" }}>
          {/* <FileBase
            style={{
              opacity: 0,
              width: "97%",
              margin: "10px 0",
              marginLeft: 20,
            }}
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFormData({ ...formData, selectedFile: base64 })
            }
            value={formData.selectedFile}
          /> */}

          <img
            src={preview || formData.selectedFile}
            alt=""
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              marginTop: -10,
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            onChange={previewFile}
          />

          <FileUploadIcon
            style={{
              cursor: "pointer",
              backgroundColor: "#efefef",
              borderRadius: 10,
              marginLeft: -10,
            }}
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          />

          <TextField
            label="Name"
            variant="standard"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
          <TextField
            label="Breed"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, breed: e.target.value })
            }
            value={formData.breed}
          />
          <TextField
            label="Owner"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, owner: e.target.value })
            }
            value={formData.owner}
          />
          <TextField
            label="Description"
            variant="standard"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />
          <Button
            variant="contained"
            style={{ marginTop: 20 }}
            onClick={handleAdd}
          >
            {isEdit ? "Update" : "Add"}
          </Button>
        </Grid>
      </Grid>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          float: "left",
          width: "80%",
        }}
      >
        <Typography variant="body2">
          Showing {petList.length ? petList.length : 0} out of{" "}
          {totalPets ? totalPets : 0} entries
        </Typography>
        <Stack spacing={2}>
          <PetPagination page={page} />
        </Stack>
      </div>
    </div>
  );
}
