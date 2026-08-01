import { redirect } from "next/navigation";

// Patient authentication has been removed; redirect to booking page.
const AppointmentList = async () => {
  redirect("/booking/jaipur");
};

export default AppointmentList;
