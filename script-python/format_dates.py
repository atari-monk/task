from datetime import datetime

def format_dates(start_date_str, end_date_str):
    # Convert the input date strings to datetime objects
    start_date = datetime.strptime(start_date_str, "%H:%M %d-%m-%Y")
    end_date = datetime.strptime(end_date_str, "%H:%M %d-%m-%Y")

    # Format the datetime objects as strings in the desired format
    formatted_start_date = start_date.strftime("%Y-%m-%d %H:%M")
    formatted_end_date = end_date.strftime("%Y-%m-%d %H:%M")

    return formatted_start_date, formatted_end_date

# Example usage:
start_date_str = "22:03 15-10-2023"
end_date_str = "00:05 16-10-2023"
formatted_start, formatted_end = format_dates(start_date_str, end_date_str)
print("Formatted Start Date:", formatted_start)
print("Formatted End Date:", formatted_end)
