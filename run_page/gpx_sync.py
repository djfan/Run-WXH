"""
If you do not want bind any account
Only the gpx files in GPX_OUT sync
"""

from datetime import datetime
from config import GPX_FOLDER, JSON_FILE, SQL_FILE

from utils import make_activities_file

if __name__ == "__main__":
    print("only sync gpx files in GPX_OUT")
    # Only include running activities
    start_date = datetime.strptime("2025-04-16", "%Y-%m-%d")
    # Create generator with run-only filter
    from generator import Generator

    generator = Generator(SQL_FILE)
    generator.only_run = True
    generator.sync_from_data_dir(GPX_FOLDER, file_suffix="gpx")
    activities_list = generator.load(start_date=start_date)
    with open(JSON_FILE, "w") as f:
        import json

        json.dump(activities_list, f)
