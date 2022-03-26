using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class QuaiVat : MonoBehaviour
{

    GameObject Mario;
    Vector2 vitrichet;
    GameObject danchim;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        vitrichet = transform.position;
        if (gameObject.transform.parent.name.Equals("ChimBay"))
        {
            StartCoroutine(ChimThaDan());
        }
    }

    private void Awake()
    {
        Mario = GameObject.FindGameObjectWithTag("Player");   
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.collider.tag == "Player" && (collision.contacts[0].normal.x > 0 || collision.contacts[0].normal.x < 0 || collision.contacts[0].normal.y > 0))
        {
            if (Mario.GetComponent<MarioScript>().capdo > 0)
            {
                Mario.GetComponent<MarioScript>().capdo = 0;
                Mario.GetComponent<MarioScript>().bienhinh = true;
            } else
            {
                Mario.GetComponent<MarioScript>().MarioChet();
            }
            if (gameObject.transform.parent.name.Equals("NamLun"))
            {
                Destroy(gameObject);
            }

        }
        if (collision.collider.tag == "Player" && (collision.contacts[0].normal.y < 0))
        {
            Destroy(gameObject);
            if (gameObject.transform.parent.name.Equals("NamLun"))
            {
                GameObject namlunchet = (GameObject)Instantiate(Resources.Load("Prefabs/NamLunChet"));
                namlunchet.transform.position = vitrichet;
                Destroy(namlunchet, 1f);
            }
            if (gameObject.transform.parent.name.Equals("ChimBay"))
            {
                Destroy(gameObject);
            }

        }

        if(collision.collider.name == "GioiHanDau")
        {
            Destroy(gameObject);
        }

        if (collision.collider.tag == "Dan")
        {
            Destroy(gameObject);
        }
    }

    IEnumerator ChimThaDan()
    {
        yield return new WaitForSeconds(1.5f);
        danchim = (GameObject)Instantiate(Resources.Load("Prefabs/DanChim"));
        danchim.transform.position = new Vector2(transform.position.x, transform.position.y-0.3f);
    }
}
