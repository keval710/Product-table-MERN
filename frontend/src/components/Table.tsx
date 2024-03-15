import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { formDataInterface } from "../interface/interface";
import { Link } from "react-router-dom";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface Props {
  formData: formDataInterface[];
  handleEditClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
  handleViewClick: (id: number) => void;
}

const Table: React.FC<Props> = ({
  formData,
  handleEditClick,
  handleDeleteClick,
  handleViewClick,
}) => {
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Product Image",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/${params.value}`}
          alt="product image"
          width={100}
          height={90}
        />
      ),
    },
    {
      field: "productName",
      headerName: "Product name",
      sortComparator: (a, b) => a - b,
      width: 230,
    },
    {
      field: "price",
      headerName: "Price",
      sortComparator: (a, b) => a - b,
      width: 130,
    },
    {
      field: "description",
      headerName: "Description",
      sortComparator: (a, b) => a - b,
      sortable: true,
      width: 460,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<EditNoteTwoToneIcon />}
              onClick={() => handleEditClick(params.row.id)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="success"
              size="small"
              startIcon={<VisibilityOutlinedIcon />}
              onClick={() => handleViewClick(params.row.id)}
            >
              View
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlinedIcon />}
              onClick={() => handleDeleteClick(params.row._id)}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];
  return (
    <Box
      sx={{
        height: 650,
        width: "71%",
        marginLeft: "300px",
        marginTop: "100px",
      }}
    >
      <Link to="/addOrUpdate">
        <Button
          variant="contained"
          sx={{ position: "absolute", right: "270px", marginTop: "-50px" }}
        >
          Add Product
        </Button>
      </Link>
      <DataGrid
        rows={formData}
        columns={columns}
        getRowHeight={() => "auto"}
        pageSizeOptions={[10, 25, 35]}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        sx={{
          boxShadow: 5,
          border: 0.1,
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          borderRadius: "16PX",
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
      />
    </Box>
  );
};

export default Table;
