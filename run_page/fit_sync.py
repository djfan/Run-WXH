"""
If you do not want bind any account
Only the gpx files in GPX_OUT sync
"""

from datetime import datetime
from config import JSON_FILE, SQL_FILE, FIT_FOLDER

from utils import make_activities_file

if __name__ == "__main__":
    print("only sync fit files in FIT_OUT")
    # Only include running activities
    # Create generator with run-only filter
    from generator import Generator

    generator = Generator(SQL_FILE)
    generator.only_run = True
    generator.sync_from_data_dir(FIT_FOLDER, file_suffix="fit")
    activities_list = generator.load()
    with open(JSON_FILE, "w") as f:
        import json

        json.dump(activities_list, f)
