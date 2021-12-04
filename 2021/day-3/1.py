from typing import List

GAMMA_RATE_INDEX = 0
EPSILON_RATE_INDEX = 1

def read_input_file(filepath: str) -> List[str]:
    with open(filepath, "r") as file:
        return [line[:-1] for line in file.readlines()]


def get_power_consuption(gamma_rate: int, epsilon_rate: int) -> int:
    return gamma_rate * epsilon_rate


def get_bit_count(input: List[str], position: int) -> List[int]:
    bit_count = [0, 0]
    for line in input:
        bit = int(line[position])
        bit_count[bit] += 1
    return bit_count


def get_most_common_bit(input: List[str], position: int) -> int:
    bit_count = get_bit_count(input, position)
    if bit_count[0] > bit_count[1]:
        return 0
    return 1


def get_least_common_bit(input: List[str], position: int) -> int:
    bit_count = get_bit_count(input, position)
    if bit_count[0] > bit_count[1]:
        return 1
    return 0


def get_input_width(input: List[str]) -> int:
    return len(input[0])


def binary_to_int(value: str) -> int:
    return int(value, 2)


def get_gamma_rate(input: List[str]) -> int:
    binary_gamma_rate = ""
    for i in range(get_input_width(input)):
        binary_gamma_rate += str(get_most_common_bit(input, i))
    return binary_to_int(binary_gamma_rate)


def get_epsilon_rate(input: List[str]) -> int:
    binary_epsilon_rate = ""
    for i in range(get_input_width(input)):
        binary_epsilon_rate += str(get_least_common_bit(input, i))
    return binary_to_int(binary_epsilon_rate)


def get_life_support_rating(oxygen_generator_rating: int, co2_scrubber_rating: int) -> int:
    return oxygen_generator_rating * co2_scrubber_rating


def oxygen_bit_criteria(value: str, most_common_bit: str) -> bool:
    return value[0] == most_common_bit


def get_oxygen_generator_rating(input: List[str]):
    most_common_value = get_most_common_bit(input, 0)
    if len(input) > 0:
        print(input)
        print("most common", most_common_value)
    filtered_numbers = [v for v in input if oxygen_bit_criteria(v, str(most_common_value))]

    if len(input) > 0:
        print(filtered_numbers)

    if len(filtered_numbers) == 1:
        return filtered_numbers[0]
    return get_oxygen_generator_rating(remove_first_bit(filtered_numbers))


def remove_first_bit(input: List[str]) -> List[str]:
    return [value[1:] for value in input]


def main():
    input = read_input_file("./input.txt")

    gamma_rate = get_gamma_rate(input)
    epsilon_rate = get_epsilon_rate(input)
    print(get_power_consuption(gamma_rate, epsilon_rate))

    print("PART 2")
    oxygen_generator_rating = get_oxygen_generator_rating(input)
    print(oxygen_generator_rating)
    # gamma_rate =
    # epsilon_rate =

main()