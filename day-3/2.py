from typing import List

GAMMA_RATE_INDEX = 0
EPSILON_RATE_INDEX = 1

def read_input_file(filepath: str) -> List[str]:
    with open(filepath, "r") as file:
        return [line[:-1] for line in file.readlines()]


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


def get_life_support_rating(oxygen_generator_rating: int, co2_scrubber_rating: int) -> int:
    return oxygen_generator_rating * co2_scrubber_rating


def bit_criteria(value: str, most_common_bit: str, current_index: int) -> bool:
    return value[current_index] == most_common_bit


def get_oxygen_generator_rating(input: List[str], current_index: int):
    if current_index >= get_input_width(input):
        raise IndexError

    most_common_value = get_most_common_bit(input, current_index)
    filtered_numbers = [v for v in input if bit_criteria(v, str(most_common_value), current_index)]

    if len(filtered_numbers) == 1:
        return filtered_numbers[0]
    return get_oxygen_generator_rating(filtered_numbers, current_index + 1)


def get_co2_scrubber_rating(input: List[str], current_index: int):
    if current_index >= get_input_width(input):
        raise IndexError

    most_common_value = get_least_common_bit(input, current_index)
    filtered_numbers = [v for v in input if bit_criteria(v, str(most_common_value), current_index)]

    if len(filtered_numbers) == 1:
        return filtered_numbers[0]
    return get_co2_scrubber_rating(filtered_numbers, current_index + 1)


def remove_first_bit(input: List[str]) -> List[str]:
    return [value[1:] for value in input]


def main():
    input = read_input_file("./input.txt")

    oxygen_generator_rating = get_oxygen_generator_rating(input, 0)
    co2_scrubber_rating = get_co2_scrubber_rating(input, 0)
    print(get_life_support_rating(binary_to_int(oxygen_generator_rating), binary_to_int(co2_scrubber_rating)))

main()