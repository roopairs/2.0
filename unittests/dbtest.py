import unittest
import psycopg2

class TestStringMethods(unittest.TestCase):

    #tests that we can connect to the database and access information from tables
    def test_select(self):
        conn = psycopg2.connect("postgres://ghxbuhvcqaekmf:e0ca350eb49c619ecece518cd258363ed6d801496d50c4ae7fffa6eecf639997@ec2-107-22-253-158.compute-1.amazonaws.com:5432/d1es3so922rir0", sslmode='require')
        cur = conn.cursor()
        first_name = "Thomas"
        last_name = "Bergmann"
        select_sql = "SELECT email FROM prop_manager where LastName = \'" + last_name + "\' and FirstName = \'" + first_name + "\';"
        cur.execute(select_sql)
        output = cur.fetchone()
        self.assertEqual(output[0], "tommy@gmail.com")

if __name__ == '__main__':
    unittest.main()
