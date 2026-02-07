import { CloseOutlined } from '@mui/icons-material';
import styles from '../styles.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Member } from '../types';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import getAge from '~/utils/getAge';
import { useAsyncFn } from 'react-use';
import { addNewMember } from '../api';

interface Props {
  onClose: () => void;
}

export const AddNew = ({ onClose }: Props) => {
  const { control, handleSubmit } = useForm<Member>({
    defaultValues: {
      membershipType: undefined,
    },
  });
  const [age, setAge] = useState(0);
  const [duration, setDuration] = useState({ gym: 0, pool: 0 });
  const [_, addNewMemberAsync] = useAsyncFn(addNewMember);

  const onSubmit = (memberData: Member) => {
    console.log({ ...memberData, age });
    const { address, ...member } = memberData;
    const membershipStartDate = new Date();
    const membershipEndDate = new Date();
    membershipEndDate.setMonth(membershipStartDate.getMonth() + duration.gym);
    const payload = {
      member: {
        ...member,
        membershipStartDate: membershipStartDate.toLocaleDateString() as string,
        membershipEndDate: membershipEndDate.toLocaleDateString() as string,
      },
      address,
    };
    console.log({ payload });
    addNewMemberAsync(payload);
    onClose();
  };

  const handleDuration = (duration: number, label: string) => {
    setDuration((prev) => ({ ...prev, [label]: duration }));
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h3>Add new</h3>
          <div onClick={onClose} style={{ cursor: 'pointer' }}>
            <CloseOutlined />
          </div>
        </div>
        <div className={styles.modal_content}>
          <Typography variant='h6'>Member Details</Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.modal_form}>
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => (
                  <TextField label='FirstName' {...field} required />
                )}
              />
              <Controller
                control={control}
                name='lastName'
                render={({ field }) => (
                  <TextField label='LastName' {...field} />
                )}
              />
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <TextField label='Email' {...field} required type='email' />
                )}
              />
            </span>
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name='dateOfBirth'
                render={({ field }) => (
                  <TextField
                    type='date'
                    label='Date of birth'
                    slotProps={{
                      inputLabel: { shrink: true },
                      htmlInput: {
                        max: new Date().toJSON().split('T')[0],
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
                style={{ width: 'fit-content' }}
                disabled
                value={age}
                slotProps={{
                  input: {
                    endAdornment: 'Age',
                  },
                }}
              />
            </span>
            <span>
              <FormLabel>Gender</FormLabel>
              <Controller
                control={control}
                name='gender'
                render={({ field }) => (
                  <RadioGroup {...field} className={styles.radio_group}>
                    <FormControlLabel
                      value='Male'
                      control={<Radio required />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='Female'
                      control={<Radio required />}
                      label='Female'
                    />
                    <FormControlLabel
                      value='Others'
                      control={<Radio required />}
                      label='Others'
                    />
                  </RadioGroup>
                )}
              />
            </span>
            <Typography variant='h6'>Address</Typography>
            <br />
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name='address.streetLine1'
                render={({ field }) => (
                  <TextField label='Street Line no. 1' {...field} required />
                )}
              />
              <Controller
                control={control}
                name='address.streetLine2'
                render={({ field }) => (
                  <TextField label='Street Line no. 2' {...field} />
                )}
              />
            </span>{' '}
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name='address.city'
                render={({ field }) => (
                  <TextField label='City' {...field} required />
                )}
              />
              <Controller
                control={control}
                name='address.state'
                render={({ field }) => (
                  <TextField label='State' {...field} required />
                )}
              />
            </span>
            <span className={styles.modal_form_group_horizontal}>
              <Controller
                control={control}
                name='address.pinCode'
                render={({ field }) => (
                  <TextField label='Pin code' {...field} required />
                )}
              />
              <Controller
                control={control}
                name='address.country'
                render={({ field }) => (
                  <TextField label='Country' {...field} required />
                )}
              />
            </span>
            <Controller
              control={control}
              name='phoneNumber'
              render={({ field }) => (
                // TODO: replace with a phonenumber input component
                <TextField
                  type='tel'
                  label='Phone number'
                  {...field}
                  required
                />
              )}
            />
            <Typography variant='h6'>Gym Info</Typography>
            <span className={styles.modal_form_group_vertical}>
              <br />
              <span>
                <FormLabel>Membership Type</FormLabel>
                <Controller
                  control={control}
                  name='membershipType'
                  render={({ field }) => (
                    <span className={styles.modal_form_group_horizontal}>
                      {['Gym', 'Swimming Pool'].map((label) => (
                        <span
                          style={{
                            display: 'flex',
                            gap: '8px',
                            width: '100%',
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={label}
                                checked={
                                  field.value ===
                                  (label as (typeof field.value)[0])
                                }
                                onChange={(e) => {
                                  field.onChange(
                                    field.value ===
                                      (label as (typeof field.value)[0])
                                      ? undefined
                                      : e.target.value
                                  );
                                }}
                              />
                            }
                            label={label}
                            style={{ width: '100%' }}
                          />
                          <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>
                              Duration
                            </InputLabel>
                            <Select
                              label='Duration'
                              style={{ color: 'black' }}
                              value={duration[label === 'Gym' ? 'gym' : 'pool']}
                              onChange={(e) => {
                                handleDuration(
                                  parseInt(e.target.value as string) || 0,
                                  label === 'Gym' ? 'gym' : 'pool'
                                );
                              }}
                              disabled={
                                field.value !==
                                (label as (typeof field.value)[0])
                              }
                            >
                              <MenuItem value={0} disabled>
                                Select duration
                              </MenuItem>
                              {(label === 'Gym'
                                ? [
                                    [1, '1 month'],
                                    [3, '3 month'],
                                    [6, '6 month'],
                                    [12, '12 month'],
                                  ]
                                : [
                                    [1, '15 days'],
                                    [2, '1 month'],
                                  ]
                              ).map(([value, label]) => (
                                <MenuItem value={value}>{label}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </span>
                      ))}
                    </span>
                  )}
                />
              </span>
              <span>
                <FormLabel>Payment Method</FormLabel>
                <Controller
                  control={control}
                  name='paymentMethod'
                  render={({ field }) => (
                    <RadioGroup {...field} className={styles.radio_group}>
                      <FormControlLabel
                        value='UPI'
                        control={<Radio required />}
                        label='Upi'
                      />
                      <FormControlLabel
                        value='CASH'
                        control={<Radio required />}
                        label='Cash'
                      />
                    </RadioGroup>
                  )}
                />
              </span>
            </span>
            <Button type='submit' variant='contained'>
              Add new member
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
