import {
  Button,
  Stack,
  TextField
} from "@mui/material";

import {
  Controller,
  useForm
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  visitorSchema,
  type VisitorFormData
} from "../../utils/validation";

interface VisitorFormProps {
  onSubmit: (data: VisitorFormData) => void;
  loading?: boolean;
}

const VisitorForm = ({
  onSubmit,
  loading = false
}: VisitorFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),

    defaultValues: {
      name: "",
      phone: "",
      unit: "",
      visitDate: ""
    }
  });

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Visitor Name"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone Number"
            fullWidth
            type="tel"
            slotProps={{
              htmlInput: {
                maxLength: 10,
                inputMode: "numeric"
              }
            }}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
        )}
      />

      <Controller
        name="unit"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Unit Number"
            fullWidth
            error={Boolean(errors.unit)}
            helperText={errors.unit?.message}
          />
        )}
      />

      <Controller
        name="visitDate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            label="Visit Date"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
            error={Boolean(errors.visitDate)}
            helperText={errors.visitDate?.message}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Stack>
  );
};

export default VisitorForm;