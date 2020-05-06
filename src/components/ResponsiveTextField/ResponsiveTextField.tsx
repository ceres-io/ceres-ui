import { InputAdornment, makeStyles, TextField, Tooltip } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { IValidatedChange, IValidFieldEvents, IValidFieldProps } from "./ResponsiveTextField.types";
import { CheckCircle } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  cardContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0
  },
  grid: {
    margin: 0
  },
  textInput: {
    width: "100%"
  },
  title: {
    lineHeight: 1
  },
  actions: {
    float: "right"
  },
  addButton: {
    alignX: "right",
  },
  correctIcon: {
    color: "green"
  }
});


export const ValidatedField: FunctionComponent<IValidFieldProps & IValidFieldEvents> = (props) => {
  const classes = useStyles();
  const [hasEdited, setEdited] = useState(false);
  const [hasFocus, setFocus] = useState(false);
  const [wasWrong, setWrong] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [parsedInput, setParsedInput] = useState("");
  const [prettyInput, setPrettyInput] = useState("");

  const onInput = (userInput: string) => {
    let filtered = props.filter(userInput);
    setUserInput(filtered);

    let parsed = props.parse(filtered);
    setParsedInput(parsed);

    let pretty = props.prettify(parsed);
    setPrettyInput(pretty);

    return {
      prettyInput: pretty,
      valid: props.isValid(parsed)
    }
  }

  const isErroneous = () => {
    if (hasFocus) {
      return wasWrong && !props.isValid(parsedInput);
    }

    if (hasEdited) {
      return !props.isValid(parsedInput);
    }

    return false;
  }

  const displayValue = () => {
    if (hasFocus || !props.isValid(parsedInput)) {
      return userInput;
    } else {
      return prettyInput;
    }
  }

  const helperText = () => {
    if (isErroneous()) {
      return props.helperText;
    } else {
      return "";
    }
  }

  const adornment = () => {
    if (props.isValid(parsedInput) && hasEdited && props.includeCheckMark) {
      return {
        endAdornment:
          <InputAdornment position="end">
            <CheckCircle className={classes.correctIcon} />
          </InputAdornment>
      };
    }
  }

  const tooltip = () => {
    if (!isErroneous() && !hasFocus && userInput != prettyInput) {
      return "Your input was formatted. Edit to see your original input."
    }
    return "";
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.onEnterPressed && event.key === 'Enter') {
      props.onEnterPressed();
    }
  }

  const label = () => props.label;

  return (
    <Tooltip title={tooltip()}
      placement={"top-end"}>
      <TextField
        className={classes.textInput}
        error={isErroneous()}
        onKeyDown={handleKeyDown}
        onFocus={(() => setFocus(true))}
        onBlur={() => {
          setFocus(false)
          if (hasEdited) {
            if (props.isValid(parsedInput)) {
              setWrong(false)
            } else {
              setWrong(true)
            }
          }
        }}
        onChange={(event => {
          let out: IValidatedChange = onInput(event.target.value);
          setEdited(true);
          props.onValidatedChange(out);
        })}
        label={label()}
        value={displayValue()}
        type='string'
        variant='outlined'
        helperText={helperText()}
        InputProps={adornment()}
      />
    </Tooltip>

  );
}/* Some utility functions for parsing numbers and numbers+strings from user input */
export function extractNumbers(s: string): string {
  return Array.from(s)
    .filter(c => /\d/i.test(c))
    .join("")
}