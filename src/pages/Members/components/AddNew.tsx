import { CloseOutlined } from "@mui/icons-material";
import styles from "../styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Member } from "../types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export const AddNew = ({ onClose }: Props) => {
  const { control, handleSubmit } = useForm<Member>({
    defaultValues: {
      membershipType: [],
    },
  });
  const [age, setAge] = useState(0);

  const onSubmit = (memberData: Member) => {
    console.log(memberData);
  };

  function getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className={styles.modal_container} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h3>Add new</h3>
          <div onClick={onClose} style={{ cursor: "pointer" }}>
            <CloseOutlined />
          </div>
        </div>
        <div className={styles.modal_content}>
          <Typography variant="h6">Member Details</Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.modal_form}>
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <TextField label="FirstName" {...field} required />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <TextField label="LastName" {...field} />
                )}
              />
            </span>
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <TextField
                    type="date"
                    label="Date of birth"
                    slotProps={{
                      inputLabel: { shrink: true },
                      htmlInput: {
                        max: new Date().toJSON().split("T")[0],
                      },
                    }}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setAge(getAge(e.target.value));
                    }}
                    required
                  />
                )}
              />
              <TextField
                style={{ width: "fit-content" }}
                disabled
                value={age}
                slotProps={{
                  input: {
                    endAdornment: "Age",
                  },
                }}
              />
            </span>
            <span>
              <FormLabel>Gender</FormLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup {...field} className={styles.radio_group}>
                    <FormControlLabel
                      value="Male"
                      control={<Radio required />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio required />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Others"
                      control={<Radio required />}
                      label="Others"
                    />
                  </RadioGroup>
                )}
              />
            </span>
            <Typography variant="h6">Address</Typography>
            <br />
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name="streetLine1"
                render={({ field }) => (
                  <TextField label="Street Line no. 1" {...field} required />
                )}
              />
              <Controller
                control={control}
                name="streetLine2"
                render={({ field }) => (
                  <TextField label="Street Line no. 2" {...field} />
                )}
              />
            </span>{" "}
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <TextField label="City" {...field} required />
                )}
              />
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <TextField label="State" {...field} required />
                )}
              />
            </span>
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name="pinCode"
                render={({ field }) => (
                  <TextField label="Pin code" {...field} required />
                )}
              />
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <TextField label="Country" {...field} required />
                )}
              />
            </span>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                // TODO: replace with a phonenumber input component
                <TextField
                  type="tel"
                  label="Phone number"
                  {...field}
                  required
                />
              )}
            />
            <br />
            <span className={styles.modal_form_group_vertical}>
              <Typography variant="h6">Gym Info</Typography>
              <br />
              <span>
                <FormLabel>Membership Type</FormLabel>
                <Controller
                  control={control}
                  name="membershipType"
                  render={({ field }) => (
                    <span className={styles.modal_form_group_horizontal}>
                      {["Gym", "Swimming Pool"].map((label) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={label.toUpperCase()}
                              checked={field.value.includes(
                                label.toUpperCase() as (typeof field.value)[0]
                              )}
                              onChange={(e) => {
                                field.onChange(
                                  field.value.includes(
                                    label.toUpperCase() as (typeof field.value)[0]
                                  )
                                    ? field.value.filter(
                                        (value) => value !== e.target.value
                                      )
                                    : [...field.value, e.target.value]
                                );
                              }}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </span>
                  )}
                />
              </span>
              <span>
                <FormLabel>Payment Method</FormLabel>
                <Controller
                  control={control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <RadioGroup {...field} className={styles.radio_group}>
                      <FormControlLabel
                        value="UPI"
                        control={<Radio required />}
                        label="Upi"
                      />
                      <FormControlLabel
                        value="CASH"
                        control={<Radio required />}
                        label="Cash"
                      />
                    </RadioGroup>
                  )}
                />
              </span>
            </span>
            <Button type="submit" variant="contained">
              Add new member
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
