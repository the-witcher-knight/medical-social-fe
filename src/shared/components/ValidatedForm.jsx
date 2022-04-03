import React, { useEffect } from 'react';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { extractFieldByString } from '../util/string-util';

export function ValidatedForm({ onSubmit, defaultValues, children }) {
  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  return (
    <FormProvider {...methods}>
      <Box component="form" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </Box>
    </FormProvider>
  );
}

export const ValidatedField = ({
  name,
  label,
  rules,
  helperText,
  type,
  multiline,
  maxRows,
  margin,
  disabled,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const isError = () => !!extractFieldByString(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextField
          label={label}
          type={type || 'text'}
          disabled={disabled}
          fullWidth
          margin={margin || 'normal'}
          multiline={!!multiline}
          maxRows={maxRows}
          error={isError()}
          helperText={isError() && helperText}
          {...field}
        />
      )}
    />
  );
};
