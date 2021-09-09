import "./ReportForm.css"

const ReportForm = () => {
    return (
        <>
            <form className="reportForm">
                <input type="textArea" className="reportInput" placeholder="Why are you reporting this video?"/>
                <button>Send</button>
            </form>
        </>
        )
}

export default ReportForm