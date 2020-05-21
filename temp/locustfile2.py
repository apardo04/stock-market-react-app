from locust import HttpUser, TaskSet, task, between

class UserTasks(TaskSet):
	@task(1)
	def index(self):
		self.client.get("/r/investing")

class WebsiteUser(HttpUser):
	tasks = [UserTasks]
	wait_time = between(1, 5)