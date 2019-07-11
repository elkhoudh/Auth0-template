import React, { useState } from "react";
import data from "./result.json";
import Fuse from "fuse.js";
import Card from "../../components/Cards";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  count: {
    padding: "30px 0"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "95vw",
    textAlign: "center"
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
  };
  const fuse = (e, y) => {
    // 2 means it is nested
    const opts = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 500,
      minMatchCharLength: 1,
      keys: ["question"]
    };
    const fuse = new Fuse(e, opts);
    const res = fuse.search(search.trim());
    return res;
  };

  const checkSearch = () => {
    if (search) {
      return fuse(questions);
    } else {
      return questions;
    }
  };

  const checkPercentage = () => {
    let a = [],
      b = [],
      c = [],
      d = [];
    questions.map(q => {
      if (q.answer.toLowerCase() === "a") {
        a.push(q.answer);
      } else if (q.answer.toLowerCase() === "b") {
        b.push(q.answer);
      } else if (q.answer.toLowerCase() === "c") {
        c.push(q.answer);
      } else if (q.answer.toLowerCase() === "d") {
        d.push(q.answer);
      }
    });

    return {
      a: Math.round((a.length / questions.length) * 100 * 100) / 100,
      b: Math.round((b.length / questions.length) * 100 * 100) / 100,
      c: Math.round((c.length / questions.length) * 100 * 100) / 100,
      d: Math.round((d.length / questions.length) * 100 * 100) / 100
    };
  };

  return (
    <>
      <Typography variant="h3" color="inherit" className={classes.count}>
        737 Study Guide
      </Typography>
      <TextField
        id="standard-name"
        label="Search for questions"
        className={classes.textField}
        value={search}
        onChange={handleChange}
        margin="normal"
      />
      <Typography
        variant="body"
        color="textSecondary"
        className={classes.count}
        component="h6"
      >
        {checkSearch().length}/{questions.length} Questions <br />
        <br />
        {checkPercentage().a}% of "A" answers <br />
        {checkPercentage().b}% of "B" answers <br />
        {checkPercentage().c}% of "C" answers <br />
        {checkPercentage().d}% of "D" answers <br />
      </Typography>
      {checkSearch().map(q => {
        return (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid container justify="center">
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
