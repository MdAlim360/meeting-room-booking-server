import axios from "axios"
import config from "../../config"

export const initialPayment = async (paymentData: any) => {

    try {
        const response = await axios.post(config.payment_url!, {
            store_id: config.store_id,
            tran_id: paymentData.transactionId,
            success_url: `https://meeting-room-booking-system-backend-coral.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success&id=${paymentData.id}`,
            fail_url: `https://meeting-room-booking-system-backend-coral.vercel.app/api/payment/confirmation?status=failed`,
            cancel_url: "http://localhost:5173/",
            amount: paymentData.totalAmount,
            currency: "BDT",
            signature_key: config.signature_key,
            desc: "Merchant Registration Payment",
            cus_name: paymentData.customerName,
            cus_email: paymentData.customerEmail,
            cus_add1: "House B-158 Road 22",
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "Bangladesh",
            cus_phone: paymentData.customerPhone,
            type: "json"

        });
        return response.data
    } catch (error) {
        throw new Error('payment initiation failed!!')
    }
}

export const verifyPayment = async (tnxId: string) => {
    try {
        const response = await axios.get(config.verify_payment_url!, {
            params: {
                store_id: config.store_id,
                signature_key: config.signature_key,
                type: "json",
                request_id: tnxId
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Payment validation error!!');
    }
};