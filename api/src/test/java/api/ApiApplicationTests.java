package api;

import api.security.model.JwtAuthenticationToken;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertTrue;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class ApiApplicationTests {

	@Test
	public void contextLoads() {

        assertTrue(UsernamePasswordAuthenticationToken.class.isAssignableFrom(JwtAuthenticationToken.class));
	}

}

