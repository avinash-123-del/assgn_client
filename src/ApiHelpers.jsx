import axios from "axios"

export const getAllData = async (page) => {
    try {
        const res = await axios.post(`/get_all_customer_data?page=${page}`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const getOneCustomer = async (id) => {
    try {
        const res = await axios.post(`/get_one_customer/${id}`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const uploadFile = async (formdata) => {
    try {
        const res = await axios.post(`/uploadcsv`, formdata)
        return res.data
    } catch (error) {
        return null;
    }
}

export const searchCustomer = async (query) => {
    try {
        const res = await axios.post(`/search_customer?firstname=${query}`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const createMessage = async (data) => {
    try {
        const res = await axios.post("/create_message", {
            message: data.message,
            day: data.day,
            time: data.time
        }
        )
        return res.data
    } catch (error) {
        return null;
    }
}

export const createCategory = async (category) => {
    try {
        const res = await axios.post("/create_category", {
            category
        }
        )
        return res
    } catch (error) {
        return null;
    }
}

export const createAgent = async (agent) => {
    try {
        const res = await axios.post("/create_agent", {
            agentName: agent
        }
        )
        return res
    } catch (error) {
        return null;
    }
}

export const getAllCategories = async () => {
    try {
        const res = await axios.post(`/get_all_categories`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const getAllAgents = async () => {
    try {
        const res = await axios.post(`/get_all_agents`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const getAllMessage = async () => {
    try {
        const res = await axios.post(`/get_all_messages`)
        // console.log("msg", res.data)
        return res
    } catch (error) {
        return null;
    }
}

export const getAggregatedPolicies = async (page) => {
    try {
        const res = await axios.post(`/get_Aggregated_Policies?page=${page}`)
        return res.data
    } catch (error) {
        return null;
    }
}

export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedDay = day < 10 ? '0' + day : day;
    const monthName = months[monthIndex];

    return `${formattedDay} ${monthName} ${year}`;
}


