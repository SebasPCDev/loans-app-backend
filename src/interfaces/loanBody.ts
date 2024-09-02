import { FrequencyPayment } from "@/models/frequencyPayment";
import { Role } from "@/models/role.enum";
import { StatusLoan } from "@/models/statusloan.enum";

export interface LoanBodyRequest {
  loan: {
    amount: number;
    interest_rate: number;
    start_date: Date;
    end_date: Date;
    frequency_payment: FrequencyPayment;
    status: StatusLoan;
  };
  user: {
    name: string;
    last_name: string;
    email: string;
    age: number;
    role: Role;
  };
}
