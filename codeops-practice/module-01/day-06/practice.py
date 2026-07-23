#question 1   
print("__"*15)

# 1. BUILDS the report
class ReportBuilder:
    def __init__(self,title, content):
        self.title=title
        self.content=content
    def build(self, ):
        return f"=== {self.title} ===\n{self.content}\n"

# 2. SAVES the report
class ReportSaver:
    def save(self, report, filename):
        with open(filename, "w") as file:
            file.write(report)
        print(f"[File System] Created and saved file: '{filename}'")
        
# 3. EMAILS the report
class ReportEmailer:
    def email(self, report, recipient, email_log_file):
        email_message = f"TO: {recipient}\nBODY:\n{report}\n{'='*30}\n"

        with open(email_log_file, "a") as file:
            file.write(email_message)
        print(f"[Email System] Outgoing email saved to: '{email_log_file}'")

builder = ReportBuilder("Summary", "hi how are you ")
saver = ReportSaver()
emailer = ReportEmailer()

my_report = builder.build()

saver.save(my_report, "summary.txt")

emailer.email(my_report, "henok@email.com","sent_emails.txt")

print("__"*15)

# question 2 
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self) :
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius**2


class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

class Square(Shape):
    def __init__(self, side: float):
        self.side = side

    def area(self) -> float:
        return self.side**2

def print_area(shape: Shape) -> None:
    print(f"Area: {shape.area():.2f}")

shapes = [Circle(5), Rectangle(4, 6), Square(3)]

for s in shapes:
    print_area(s)

print("__"*15)

# 3 question 
class AppSettings:
    _instance = None  

    def __new__(class_it_self , currency):

        if class_it_self._instance is None:
            class_it_self._instance = super().__new__(class_it_self)
            class_it_self._instance.currency = currency
        return class_it_self._instance

app_settings_1 = AppSettings("ETB")
app_settings_2 = AppSettings("USD")  

print(f"app_settings_1 currency: {app_settings_1.currency}")
print(f"app_settings_2 currency: {app_settings_2.currency}")

is_same_object = app_settings_1 is app_settings_2
print(f"\nAre both instances the same object in memory? {is_same_object}")

print(f"Address 1: {hex(id(app_settings_1))}")
print(f"Address 2: {hex(id(app_settings_2))}")    

print("__"*15)
#question 4
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def draw(self) -> None:
        pass

class Circle(Shape):
    def draw(self) -> None:
        print("Drawing a Circle")


class Square(Shape):
    def draw(self) -> None:
        print("Drawing a Square")


class Triangle(Shape):
    def draw(self) -> None:
        print("Drawing a Triangle")

class ShapeFactory:
    @staticmethod
    def create(kind: str) -> Shape:

        normalized_kind = kind.lower().strip()

        if normalized_kind == "circle":
            return Circle()
        elif normalized_kind == "square":
            return Square()
        elif normalized_kind == "triangle":
            return Triangle()
        else:
            raise ValueError(f"Unknown shape kind: '{kind}'")

shape_kinds = ["circle", "square", "triangle"]

for kind in shape_kinds:
    shape = ShapeFactory.create(kind)
    shape.draw()

print("__"*15)

# question 5
from abc import ABC, abstractmethod

class Subscriber(ABC):
    @abstractmethod
    def update(self, news_headline: str) -> None:
        pass

class MobileAppSubscriber(Subscriber):
    def __init__(self, user_name: str):
        self.user_name = user_name

    def update(self, news_headline: str) :
        print(f"[Push Notification for {self.user_name}]: {news_headline}")

class EmailSubscriber(Subscriber):
    def __init__(self, email_address: str):
        self.email_address = email_address

    def update(self, news_headline: str):
        print(f"[Email sent to {self.email_address}]: Breaking News - {news_headline}")

class NewsAgency:
    def __init__(self):
        self._subscribers: list[Subscriber] = []

    def attach(self, subscriber: Subscriber):
        if subscriber not in self._subscribers:
            self._subscribers.append(subscriber)

    def detach(self, subscriber: Subscriber):
        self._subscribers.remove(subscriber)

    def notify(self, news_headline: str):
        for subscriber in self._subscribers:
            subscriber.update(news_headline)

    def publish_news(self, news_headline: str):
        print(f"\n PUBLISHING NEWS: '{news_headline}'")
        self.notify(news_headline)


agency = NewsAgency()

app_user = MobileAppSubscriber("Abebe")
email_user = EmailSubscriber("henok@example.com")

agency.attach(app_user)
agency.attach(email_user)

agency.publish_news("Tech Giants Unveil New AI Architecture")

agency.detach(email_user)

agency.publish_news("Local Tech Community Hosts Python Workshop")
