import "./ReportForm.css"

const ReportForm = () => {
    return (
        <>
            <form>
                <input type="textArea" className="reportForm" placeholder="Why are you reporting this video?"/>
                <button>Send</button>
            </form>
        </>
        )
}

export default ReportForm