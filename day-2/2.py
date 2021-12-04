def parse_line(line: str):
    return line.split(" ")

with open("./input.txt") as file:
    lines = file.readlines()
    commands = [parse_line(line.strip()) for line in lines]

x = 0
y = 0
aim = 0
for dir, qt in commands:
    if dir == "forward":
        x += int(qt)
        y += aim*int(qt)
    if dir == "up":
        aim -= int(qt)
    if dir == "down":
        aim += int(qt)

print(x * y)
