import subprocess

def start_bot(bot_type):
    try:
        subprocess.run(["node", f"{bot_type.lower()}.js"])
        print(f"{bot_type.lower()}.js script has been started.")
    except Exception as e:
        print(f"An error occurred: {e}")

print("""
 █YES█████╗██╗  SICK   ██╗   ██╗██████╗ ███████╗███╗   ██╗██████╗ HOPPAPIT    ████████╗ ██████╗  ██████╗ ██╗  ██╗
██╔════╝██║     ██║   ██║██╔══██╗██╔════╝████╗  ██║██╔══██╗    ╚══██╔══╝██╔═══██╗██╔═══██╗╚██╗██╔╝
██║     ██║     ██║   ██║██████╔╝█████╗  ██╔██╗ ██║██║  ██║       ██║   ██║   ██║██║   ██║ ╚███╔╝
██║     ██║     ██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║       ██║   ██║   ██║██║   ██║ ██╔██╗
╚██████╗███████╗╚██████╔╝██║     ███████╗██║ ╚████║██████╔╝       ██║   ╚██████╔╝╚██████╔╝██╔╝ ██╗
 ╚═════╝╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝        ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                                                                       
CURRENT OPTIONS: PIT, BEDWARS
COPYRIGHT: SICK https://discord.gg/fkHm7tUD53 (ALL RIGHTS RESERVED)
""")

bottype = input("[?] ENTER OPTION: ")

if bottype.upper() in {"PIT", "BEDWARS"}:
    print(f"Starting {bottype.lower()}.js bot...")
    start_bot(bottype)
else:
    print("Invalid option. Please choose from the provided options.")
