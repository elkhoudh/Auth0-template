import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflowY: "hidden"
  },
  card: {
    textAlign: "left",
    width: "95vw",
    minWidth: "95vw"
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

const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: green[500]
    }
  }
});

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <ThemeProvider theme={outerTheme}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.question && props.question.question}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              paragraph
              color={
                props.question &&
                props.question.answer.toLowerCase() ===
                  Object.keys(props.question)[1]
                  ? "secondary"
                  : "inherit"
              }
            >
              {props.question && props.question.a}
            </Typography>
            <Typography
              paragraph
              color={
                props.question &&
                props.question.answer.toLowerCase() ===
                  Object.keys(props.question)[2]
                  ? "secondary"
                  : "inherit"
              }
            >
              {props.question && props.question.b}
            </Typography>
            <Typography
              paragraph
              color={
                props.question &&
                props.question.answer.toLowerCase() ===
                  Object.keys(props.question)[3]
                  ? "secondary"
                  : "inherit"
              }
            >
              {props.question && props.question.c}
            </Typography>
            <Typography
              paragraph
              color={
                props.question &&
                props.question.answer.toLowerCase() ===
                  Object.keys(props.question)[4]
                  ? "secondary"
                  : "inherit"
              }
            >
              {props.question && props.question.d}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
