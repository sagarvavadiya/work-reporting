export const QuizData = [
    {
        "id": "1",
        "question": "What will be the output of the following code?\n\nlet arr = [1, 2, 3, 4, 5];\nlet removed = arr.splice(1, 2, 10, 20);\nconsole.log(arr);",
        "options": [
            "[1, 10, 20, 4, 5]",
            "[1, 2, 3, 4, 5]",
            "[1, 10, 20, 3, 4, 5]",
            "[10, 20, 4, 5]"
        ],
        "answer": '1'
    },
    {
        "id": "2",
        "question": "What does the splice method return in the following case?\n\nlet arr = [10, 20, 30, 40, 50];\nlet removed = arr.splice(2, 2);\nconsole.log(removed);",
        "options": [
            "[10, 20]",
            "[30, 40]",
            "[40, 50]",
            "[20, 30]"
        ],
        "answer": '2'
    },
    {
        "id": "3",
        "question": "What happens when you use a negative start index in splice?\n\nlet arr = [5, 10, 15, 20];\narr.splice(-2, 1, 99);\nconsole.log(arr);",
        "options": [
            "[5, 10, 99, 20]",
            "[5, 10, 99, 15, 20]",
            "[5, 10, 15, 99, 20]",
            "[5, 99, 15, 20]"
        ],
        "answer": '2'
    },
    {
        "id": "4",
        "question": "What is the result of calling splice with a start index greater than the array length?\n\nlet arr = [1, 2, 3];\narr.splice(5, 1, 9);\nconsole.log(arr);",
        "options": [
            "[1, 2, 3]",
            "[1, 2, 3, 9]",
            "[1, 2, 3, undefined, 9]",
            "[1, 2, 9, 3]"
        ],
        "answer": '3'
    },
    {
        "id": "5",
        "question": "How does splice behave when delete count is 0?\n\nlet arr = ['a', 'b', 'c'];\narr.splice(1, 0, 'x', 'y');\nconsole.log(arr);",
        "options": [
            "['a', 'x', 'y', 'b', 'c']",
            "['a', 'b', 'c']",
            "['a', 'b', 'x', 'y', 'c']",
            "['x', 'y', 'a', 'b', 'c']"
        ],
        "answer": '1'
    },
    {
        "id": "6",
        "question": "What will be the result if you provide only one argument to splice?\n\nlet arr = [1, 2, 3, 4, 5];\narr.splice(2);\nconsole.log(arr);",
        "options": [
            "[1, 2]",
            "[1, 2, 3, 4, 5]",
            "[3, 4, 5]",
            "[1, 2, 3]"
        ],
        "answer": '4'
    },
    {
        "id": "7",
        "question": "Which of the following statements about splice is false?",
        "options": [
            "splice modifies the original array",
            "splice can remove elements without adding any new elements",
            "splice always returns an array of the removed elements",
            "splice cannot be used to add new elements"
        ],
        "answer": '4'
    }
]
