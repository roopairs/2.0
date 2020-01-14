import unittest
import psycopg2


dbUrl = ("postgres://ghxbuhvcqaekmf:e0ca350eb49c619ecece518cd258363ed6d801496d"
         "50c4ae7fffa6eecf639997@ec2-107-22-253-158.compute-1.amazonaws.com:54"
         "32/d1es3so922rir0")

################################################################################
# Vertical Prototype Functions
#

def insertDummyInfo():
   # Vars
   pmTargets = "(LastName, FirstName, email, phone, password)"
   propertyTargets = "(address, SLID, numBath, numBed, maxTenats, manId)"

   # Make connection to the database
   conn = psycopg2.connect(dbUrl, sslmode='require')

   # Cursors let you perform database operations
   cur = conn.cursor()

   # Inserts a dummy Adam account into the database
   values = "('Berard', 'Adam', 'adam@gmail.com', '9092614617', 'pass4adam')"
   cur.execute("INSERT INTO prop_manager %s VALUES %s;" % (pmTargets, values))

   # Inserts a dummy Tommy account into the database
   values = "('Bergmann', 'Thomas', 'tommy@gmail.com', '8575552323', 'pass4tommy')"
   cur.execute("INSERT INTO prop_manager %s VALUES %s;" % (pmTargets, values))

   # Get the auto-created manager id for Tommy
   select_sql = ("SELECT managerId FROM prop_manager "
                "WHERE email = 'tommy@gmail.com' and password = 'pass4tommy';")
   cur.execute(select_sql)
   manId = cur.fetchone()
   manId = manId[0]

   # Insert a property owned by Tommy
   values = "('200 North Santa Rosa Street', 1, 3, 3, 6," + str(manId) + ")"
   insert_sql = "INSERT INTO property %s VALUES %s;" % (propertyTargets, values)
   cur.execute(insert_sql)

   # Insert a property owned by Tommy
   values = "('110 Orange Drive', 2, 2, 1.5, 3, " + str(manId) + ")"
   insert_sql = "INSERT INTO property %s VALUES %s;" % (propertyTargets, values)
   cur.execute(insert_sql)

   # Make the changes to the database persistent
   conn.commit()

   # Close communication with the database
   cur.close()
   conn.close()
   
def deleteTables():
   # Make connection to the database
   conn = psycopg2.connect(dbUrl, sslmode='require')

   # Cursors let you perform database operations
   cur = conn.cursor()

   # Delete everything
   cur.execute("DELETE FROM prop_manager where true")
   cur.execute("DELETE FROM property where true")

   # Make the changes to the database persistent
   conn.commit()

   # Close communication with the database
   cur.close()
   conn.close()

class TestStringMethods(unittest.TestCase):

   #tests that we can connect to the database and access information from tables
   def test_select(self):
      deleteTables()
      insertDummyInfo()
      conn = psycopg2.connect(dbUrl, sslmode='require')
      cur = conn.cursor()
      email = "tommy@gmail.com"
      password = "pass4tommy"
      select_sql = "SELECT LastName FROM prop_manager where email = \'" + email + "\' and password = \'" + password + "\';"
      cur.execute(select_sql)
      output = cur.fetchone()
      self.assertEqual(output[0], "Bergmann")
      deleteTables()

if __name__ == '__main__':
   unittest.main()
