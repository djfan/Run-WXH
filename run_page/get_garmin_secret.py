import yaml
import garth

if __name__ == "__main__":
    with open("config.yaml") as f:
        config = yaml.safe_load(f)

    email = config.get("sync", {}).get("garmin", {}).get("email")
    password = config.get("sync", {}).get("garmin", {}).get("password")
    is_cn = config.get("sync", {}).get("garmin", {}).get("is_cn", False)

    if not email or not password:
        raise Exception("Email or password not found in config.yaml")

    if is_cn:
        garth.configure(domain="garmin.cn", ssl_verify=False)

    garth.login(email, password)
    secret_string = garth.client.dumps()
    print(secret_string)
