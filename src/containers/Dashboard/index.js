import React, { useState } from "react";
import data from "./result.json";
import Fuse from "fuse.js";
import Card from "../../components/Cards";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  root: {
    flexGrow: 1
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  const [questions] = useState(data);
  const [search, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.target.value);
    console.log(search);
  };
  const fuse = (e, y) => {
    // 2 means it is nested
    const opts = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["question"]
    };
    const fuse = new Fuse(e, opts);
    const res = fuse.search(search);
    return res;
  };

  return (
    <>
      <TextField
        id="standard-name"
        label="Search for questions"
        className={classes.textField}
        value={search}
        onChange={handleChange}
        margin="normal"
      />
      {fuse(questions).map(q => {
        return (
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={6}>
                <Grid item>
                  <Card question={q} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default Dashboard;
