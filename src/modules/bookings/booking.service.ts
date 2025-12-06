import { pool } from "../../config/db";

const createBooking = async (customer_id:string, vehicle_id:string, rent_start_date:string, rent_end_date:string, total_price:string, status:string) =>{
    const result = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);
    return result;
    
};

const getBooking = async ()=>{
    const result = await  pool.query(`SELECT * FROM bookings ORDER BY id`);
    return result;
};

const getSingleBooking = async (bookingId:string)=>{
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`,[bookingId]);
    return result;
};

const updateBooking = async (customer_id:string, vehicle_id:string, rent_start_date:string, rent_end_date:string, total_price:string, status:string,bookingId:string)=>{
    const result = await pool.query(`UPDATE bookings SET customer_id=$1, vehicle_id=$2, rent_start_date=$3, rent_end_date=$4, total_price=$5, status=$6
   WHERE id=$7 RETURNING *`,[customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status,bookingId]
   );

   return result;
};

const deleteBooking = async (bookingId:string)=>{
    const result = await pool.query(`DELETE FROM bookings WHERE id = $1 RETURNING *`,[bookingId]);
    return result;
}
export const bookingServices = {
    createBooking,
    getBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking
}