import { useNavigate, useParams } from 'react-router-dom';
import { useSetUser, useUser } from '~/contexts/Users';
import styles from './styles.module.scss';
// import styles from '../styles.module.scss';
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
import { Controller, useForm } from 'react-hook-form';
import { Member } from '../types';
import { useEffect, useState } from 'react';
import { HourglassBottom } from '@mui/icons-material';

const MembersDetails = () => {
  const { id } = useParams();
  const [user] = useUser(id);
  const navigate = useNavigate();

  if (!user || !id) navigate('/members');

  const { control, handleSubmit, reset, setValue, formState } = useForm<Member>(
    {
      defaultValues: user || { membershipType: [] },
    }
  );

  const setUserData = useSetUser();
  const [age, setAge] = useState(user?.age ?? 0);
  const [duration, setDuration] = useState({ gym: 0, pool: 0 });

  const onSubmit = (memberData: Member) => {
    setUserData({ ...memberData, age: age || memberData.age });
    navigate('/members');
  };

  const handleDuration = (duration: number, label: string) => {
    setDuration((prev) => ({ ...prev, [label]: duration }));
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

  useEffect(() => {
    if (user) {
      reset(user);
      setValue('gender', user.gender);
      setAge(user.age);
    }
  }, [user]);

  return !user ? (
    <div className={styles.container}>
      <HourglassBottom />
    </div>
  ) : (
    <div className={styles.container}>
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
            render={({ field }) => <TextField label='LastName' {...field} />}
          />
        </span>
        <span className={styles.modal_form_group_horizontal}>
          <Controller
            control={control}
            name='dob'
            render={({ field }) => (
              <TextField
                style={{ width: 'fit-content' }}
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
                  control={<Radio checked={field.value === 'Male'} required />}
                  label='Male'
                />
                <FormControlLabel
                  value='Female'
                  control={
                    <Radio checked={field.value === 'Female'} required />
                  }
                  label='Female'
                />
                <FormControlLabel
                  value='Others'
                  checked={field.value === 'Others'}
                  control={<Radio required />}
                  label='Others'
                />
              </RadioGroup>
            )}
          />
        </span>
        <Typography variant='h6'>Address</Typography>
        <span className={styles.modal_form_group_horizontal}>
          <Controller
            control={control}
            name='streetLine1'
            render={({ field }) => (
              <TextField label='Street Line no. 1' {...field} required />
            )}
          />
          <Controller
            control={control}
            name='streetLine2'
            render={({ field }) => (
              <TextField label='Street Line no. 2' {...field} />
            )}
          />
        </span>
        <span className={styles.modal_form_group_horizontal}>
          <Controller
            control={control}
            name='city'
            render={({ field }) => (
              <TextField label='City' {...field} required />
            )}
          />
          <Controller
            control={control}
            name='state'
            render={({ field }) => (
              <TextField label='State' {...field} required />
            )}
          />
        </span>
        <span className={styles.modal_form_group_horizontal}>
          <Controller
            control={control}
            name='pinCode'
            render={({ field }) => (
              <TextField label='Pin code' {...field} required />
            )}
          />
          <Controller
            control={control}
            name='country'
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
            <TextField type='tel' label='Phone number' {...field} required />
          )}
        />
        <br />
        <span className={styles.modal_form_group_vertical}>
          <Typography variant='h6'>Gym Info</Typography>
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
                            !field.value.includes(
                              label.toUpperCase() as (typeof field.value)[0]
                            )
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
                    control={<Radio checked={field.value === 'UPI'} required />}
                    label='Upi'
                  />
                  <FormControlLabel
                    value='CASH'
                    control={
                      <Radio checked={field.value === 'CASH'} required />
                    }
                    label='Cash'
                  />
                </RadioGroup>
              )}
            />
          </span>
        </span>
        <Button
          type='submit'
          variant='contained'
          disabled={!user || !formState.isDirty}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default MembersDetails;
