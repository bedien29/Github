using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VienDan : MonoBehaviour
{

    Rigidbody2D r2d;
    GameObject Mario;
    Vector2 huong;
    // Start is called before the first frame update
    void Start()
    {
        r2d = GetComponent<Rigidbody2D>();
        huong = transform.localScale;
        if(Mario.GetComponent<MarioScript>().quayphai == true)
        {
            transform.localScale = huong;
            r2d.AddForce(new Vector2(330f, 0));
        } else
        {
            huong.x *= -1;
            transform.localScale = huong;
            r2d.AddForce(new Vector2(-330f, 0));
        }
    }

    // Update is called once per frame
    void Update()
    {
        Destroy(gameObject, 1.5f);
    }

    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");

    }

    void FixedUpdate()
    {
        
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.collider.tag != "Player" || collision.collider.tag != "Dan")
        {
            Destroy(gameObject);
        }
    }
}




