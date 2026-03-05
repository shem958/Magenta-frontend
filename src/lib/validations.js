import * as yup from "yup";

// Employee validation schema
export const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  department: yup.string().required("Department is required"),
  position: yup.string().required("Position is required"),
  phone: yup
    .string()
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format")
    .nullable(),
  status: yup.string().oneOf(["Active", "Inactive"]).default("Active"),
});

// Inventory item validation schema
export const inventoryItemSchema = yup.object().shape({
  name: yup
    .string()
    .required("Item name is required")
    .min(2, "Name must be at least 2 characters"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .required("Stock quantity is required")
    .min(0, "Stock cannot be negative")
    .integer("Stock must be a whole number"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  reorderLevel: yup
    .number()
    .required("Reorder level is required")
    .min(0, "Reorder level cannot be negative")
    .integer("Reorder level must be a whole number"),
  supplier: yup.string().nullable(),
  description: yup.string().nullable(),
});

// Delivery validation schema
export const deliverySchema = yup.object().shape({
  recipientName: yup.string().required("Recipient name is required"),
  recipientAddress: yup.string().required("Delivery address is required"),
  recipientPhone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  items: yup
    .array()
    .of(
      yup.object().shape({
        itemId: yup.string().required("Item is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "At least one item is required"),
  scheduledDate: yup.date().required("Scheduled date is required"),
  notes: yup.string().nullable(),
});

// Transaction validation schema
export const transactionSchema = yup.object().shape({
  type: yup
    .string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"], "Invalid transaction type"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  date: yup.date().required("Date is required"),
});

// Login validation schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Registration validation schema
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
