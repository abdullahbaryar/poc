//
import Paper from "./Paper";
import Button from "./Button";
import Typography from "./Typography";
import TextField from "./Textfield";
// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Paper(theme),
    Button(theme),
    Typography(theme),
    TextField(theme)
  );
}
